import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { UserData } from 'src/app/services/users/users.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { BaseComponent } from '../base/base.component';
import { GroupsService, GroupData } from 'src/app/services/groups/groups.service';
import { FormControl, Validators } from '@angular/forms';
import { RetryConfig, Animations } from 'src/app/services/common/common.service';

interface DialogData {
  name: string;
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  animations: [ Animations.Fadein ]
})
export class GroupsComponent extends BaseComponent implements OnInit {
  @Input() user: UserData;
  /** 選択中のグループが切り替わった際のイベント通知 */
  @Output('onChange') onChangeEmitter: EventEmitter<GroupData> = new EventEmitter();

  /** 取得したグループのマップ */
  groupDataMap: Map<string, GroupData> = new Map();
  /** 取得したグループの配列 */
  groupDataList: Array<GroupData> = [];
  /** データ読込中フラグ */
  isLoading: boolean = true;
  /** リトライを行った回数 */
  private retryCount: number = 0;
  /** 選択中のインデックス */
  selectedIndex: number = 0;

  constructor(private groupsInfo: GroupsService,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    // グループ一覧を監視
    this.observeGroupsInfo();
  }

  /** グループ情報一覧を監視 */
  private observeGroupsInfo() {
    this.isLoading = true;
    const func = this.groupsInfo.observeGroupsInfo((querySnapshot) => {
      // 監視を始めた直後 + データの更新の度に呼び出されるコールバック
      querySnapshot.forEach((queryDocumentSnapShot) => {
        // Snapshotからグループデータを生成
        const fetchedGroupData = new GroupData(queryDocumentSnapShot);

        const storedGroupData = this.groupDataMap.get(fetchedGroupData.id);
        if (storedGroupData) {
          // オブジェクトの参照を変えずにデータを更新する
          storedGroupData.copyParams(fetchedGroupData);
        } else {
          // 未取得のデータであれば追加
          this.groupDataList.push(fetchedGroupData);
          this.groupDataMap.set(fetchedGroupData.id, fetchedGroupData);
        }
      });

      if (this.isLoading) {
        // groupDataMapの一番最初のグループが選択されたことを通知
        this.emitOnChange(this.groupDataMap.values().next().value);
      }
      this.isLoading = false;
    }, (err) => {
      this.isLoading = false;
      console.error(err);
    });
    // コンポーネント破棄時に監視を止めるよう設定
    this.addObserveAutoRemover(func);
  }

  /** グループ新規作成ボタンが押された際
   *
   * @param event
   */
  onRegisterButtonClick(event: MouseEvent) {
    this.openGroupRegisterDialog();
  }

  /** グループ名入力用のダイアログを表示 */
  private openGroupRegisterDialog() {
    const dialogRef = this.dialog.open(GroupRegisterDialogComponent, {
      // ダイアログの初期値
      data: {
        name: 'グループ ' + (this.groupDataMap.size + 1)
      }
    });

    dialogRef.afterClosed().subscribe((groupName) => {
      // ダイアログを閉じた際のコールバック
      if (groupName) {
        // グループ名が入力されていればグループを作成
        this.registerGroup(groupName);
      }
    });
  }

  /** グループを新規作成
   *
   * @param groupName 作成するグループ名
   */
  private registerGroup(groupName: string) {
    this.groupsInfo.addGroupsInfo(groupName, this.user.id).then((data) => {
      this.retryCount = 0;
    }).catch((reason) => {
      console.error(reason);

      // 一定回数内であれば取得処理をリトライ
      if (this.retryCount < RetryConfig.max) {
        this.retryCount++;
        setTimeout(() => {
          this.registerGroup(groupName);
        }, RetryConfig.interval);
      }
    });
  }

  /** グループ名がクリックされた際
   *
   * @param event
   * @param group 選択されたグループ情報
   * @param index 選択されたインデックス
   */
  onGroupListClick(event: MouseEvent, group: GroupData, index: number) {
    this.selectedIndex = index;
    this.emitOnChange(group);
  }

  /** グループが選択されたことを通知
   *
   * @param group 選択されたグループ情報
   */
  private emitOnChange(group: GroupData) {
    this.onChangeEmitter.next(group);
  }
}


@Component({
  selector: 'app-groups-register-dialog',
  templateUrl: './groups-register-dialog.component.html',
  styleUrls: [ './groups.component.scss' ]
})
export class GroupRegisterDialogComponent {
  control: FormControl = new FormControl(this.data.name, [Validators.required, Validators.maxLength(12)]);

  constructor(private dialogRef: MatDialogRef<GroupRegisterDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  /** キャンセルボタンがクリックされた際 */
  onCancelButtonClick() {
    this.dialogRef.close();
  }
}
