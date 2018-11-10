import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UsersService, GoogleUserProfile } from 'src/app/services/users/users.service';
import { DataStoreService, LocalStorageKey } from 'src/app/services/data-store/data-store.service';
import { Animations } from 'src/app/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import { MatRadioChange } from '@angular/material';
import { I18nService, SupportedLangs } from 'src/app/services/i18n/i18n.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [ Animations.Fadein ]
})
export class LoginComponent implements OnInit {
  /** エラー発生フラグ */
  hasError: boolean = false;
  /** 選択した言語 */
  selectedLang: string = 'ja';
  /** サポートする言語一覧 */
  supportedLangs = SupportedLangs;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private users: UsersService,
              private ngZone: NgZone,
              public  translate: TranslateService,
              private cd: ChangeDetectorRef) { }

  ngOnInit() {
    // TODO: LocalStorageから保存済みの言語を取得
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
      this.cd.detectChanges();
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

  /** 選択中の言語が変わった際
   *
   * @param event
   */
  onLangRadioChange(event: MatRadioChange) {
    this.changeLang(this.selectedLang);
  }

  /** 使用する言語を切り替え
   *
   * @param lang 変更する言語
   */
  changeLang(lang: string) {
    // TODO: 選択した言語をローカルストレージに保存
    // TODO: 表示を選択した言語に切り替え
  }
}
