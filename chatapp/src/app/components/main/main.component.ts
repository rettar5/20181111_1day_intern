import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService, UserData } from 'src/app/services/users/users.service';
import { BaseComponent } from '../base/base.component';
import { Animations } from 'src/app/services/common/common.service';
import { GroupData } from 'src/app/services/groups/groups.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [ Animations.Fadein ]
})
export class MainComponent extends BaseComponent implements OnInit {
  @ViewChild('timelineMessages') messagesRef: ElementRef;

  /** メニューの表示フラグ */
  shouldShowMenu: boolean = true;
  /** ログイン中のユーザ情報 */
  loginUser: UserData;
  /** 選択中のグループ情報 */
  selectedGroup: GroupData;
  /** リトライを行った回数 */
  private retryCount: number = 0;

  constructor(private users: UsersService,
              private authService: AuthService) {
    super();
  }

  ngOnInit() {
    this.fetchLoginUserData();
  }

  /** Firestoreからユーザ情報を取得 */
  private fetchLoginUserData() {
    // TODO: ユーザ情報取得処理を実装
  }

  /** グループが選択された際
   *
   * @param group 選択されたグループ
   */
  onGroupSelected(group: GroupData) {
    this.selectedGroup = group;
  }

  /** タイムラインのメッセージを読み込んだ際（初回） */
  onTimelineInit() {
    this.shiftAction(() => {
      this.scrollBottom();
    });
  }

  /** タイムラインのメッセージを読み込んだ際 */
  onTimelineLoad() {
    const elem = this.messagesRef.nativeElement;
    const diff = elem.scrollHeight - elem.clientHeight - elem.scrollTop;
    // 最下部から100px以上スクロールしていなければ、最下部にスクロール
    if (diff < 100) {
      this.shiftAction(() => {
        this.scrollBottom();
      });
    }
  }

  /** メッセージが投稿された際
   *
   * @param messageId
   */
  onMessagePost(messageId: string) {
    this.scrollBottom();
  }

  /** タイムラインを最下部までスクロール */
  private scrollBottom() {
    const elem = this.messagesRef.nativeElement;
    elem.scrollTop = elem.scrollHeight;
  }
}
