import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService, UserData } from 'src/app/services/users/users.service';
import { BaseComponent } from '../base/base.component';
import { DataStoreService, LocalStorageKey } from 'src/app/services/data-store/data-store.service';
import { RetryConfig, AuthSsrvice } from 'src/app/services/common/common.service';
import { Router } from '@angular/router';
import { GroupData } from 'src/app/services/groups/groups.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
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
              private authService: AuthSsrvice) {
    super();
  }

  ngOnInit() {
    this.fetchLoginUserData();
  }

  /** Firestoreからユーザ情報を取得 */
  private fetchLoginUserData() {
    // ログイン中のユーザIDを、ローカルストレージから取得
    const loginId = DataStoreService.getItem(LocalStorageKey.loginId);
    // ユーザIDを使ってFirestoreからユーザ情報を取得
    this.users.fetchUserData(loginId).subscribe((snapshot) => {
      this.retryCount = 0;
      this.loginUser = new UserData(snapshot);
    }, (err) => {
      // 取得に失敗した際
      console.error(err);

      // 一定回数内であれば取得処理をリトライ
      if (this.retryCount < RetryConfig.max) {
        this.retryCount++;
        setTimeout(() => {
          this.fetchLoginUserData();
        }, RetryConfig.interval);
      } else {
        // リトライ上限を超えた際はログアウトする
        this.authService.logout();
      }
    });
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
