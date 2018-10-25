import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { UserData } from 'src/app/services/users/users.service';
import { MatSelectionList, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  @Input() user: UserData;
  @Output('onChange') onChangeEmitter: EventEmitter<string> = new EventEmitter();
  /** テンプレート内の<mat-selection-list>の参照 */
  @ViewChild(MatSelectionList) selectionList: MatSelectionList;

  _groupNames: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  constructor() { }

  ngOnInit() {
    // リストを単一選択に変更
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);

    // TODO: グループ一覧を監視する処理を追加
  }

  onRegisterButtonClick(event: MouseEvent) {
    // TODO: グループの新規作成
  }
}
