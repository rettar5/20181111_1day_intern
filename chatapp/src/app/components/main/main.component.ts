import { Component, OnInit } from '@angular/core';
import { UsersService, UserData } from 'src/app/services/users/users.service';
import { BaseComponent } from '../base/base.component';
import { DataStoreService, LocalStorageKey } from 'src/app/services/data-store/data-store.service';
import { RetryConfig } from 'src/app/services/common/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {
  /** メニューの表示フラグ */
  shouldShowMenu: boolean = true;
  /** ログイン中のユーザ情報 */
  loginUser: UserData;
  /** リトライを行った回数 */
  private retryCount: number = 0;

  constructor(private users: UsersService,
              private router: Router) {
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
      }
    });
  }
}
