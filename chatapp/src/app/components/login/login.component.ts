import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UsersService, GoogleUserProfile } from 'src/app/services/users/users.service';
import { DataStoreService, LocalStorageKey } from 'src/app/services/data-store/data-store.service';
import { Animations } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [ Animations.Fadein ]
})
export class LoginComponent implements OnInit {
  hasError: boolean = false;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private users: UsersService,
              private ngZone: NgZone) { }

  ngOnInit() {
  }

  /** ログインボタンがクリックされた際
   *
   * @param event
   */
  onLoginButtonClick(event: MouseEvent) {
    this.loginByGoogleAuthProvider();
  }

  /** Googleアカウントでログイン */
  private loginByGoogleAuthProvider() {
    this.hasError = false;

    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((data) => {
      // Googleアカウントでの認証完了
      const profile = data.additionalUserInfo.profile as GoogleUserProfile;
      // ログインしたユーザのIDを、ローカルストレージに保存
      DataStoreService.setItem(LocalStorageKey.loginId, profile.id);
      return this.users.setUserData(profile);
    }).then(() => {
      // Firestoreへのデータ登録完了
      this.moveToMain();
    }).catch((reason) => {
      // 例外発生時
      console.error('reason: ', reason);
      this.hasError = true;
    });
  }

  /** メインコンポーネントへ繊維 */
  private moveToMain() {
    /**
     * AngularFire（firebase-js-sdk?）内のコールバックで発生したイベントが検知できないため、ngZoneを使って強制的に再描画を行う。
     * 参考: https://qiita.com/maechabin/items/a10811bbb470bc490b80
     */
    this.ngZone.run(() => {
      this.router.navigate(['/main']);
    });
  }
}
