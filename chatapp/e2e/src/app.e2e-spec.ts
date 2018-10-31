import { AppPage } from './app.po';
import { LoginPage } from './login.po';

import { firebaseConfig } from '../../src/environments/firebase.config';
import { accountConfig } from '../account.config';

describe('chatapp e2e test', () => {
  let appPage: AppPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    appPage = new AppPage();
    loginPage = new LoginPage();
  });

  it('トップ画面を表示', () => {
    appPage.navigateTo();
    expect(loginPage.getLoginButtonText()).toEqual('Googleアカウントでログイン');
  });

  describe('LoginComponent', () => {
    describe('利用言語の切り替え', () => {
      it('表示言語が英語に切り替わること', () => {
        loginPage.clickLangButton('en');
        expect(loginPage.getLoginButtonText()).toEqual('Login by google account');
      });

      it('表示言語が英語に切り替わること', () => {
        loginPage.clickLangButton('zh-cmn-Hans');
        expect(loginPage.getLoginButtonText()).toEqual('通过Google帐户登录');
      });

      it('表示言語が日本語に切り替わること', () => {
        loginPage.clickLangButton('ja');
        expect(loginPage.getLoginButtonText()).toEqual('Googleアカウントでログイン');
      });
    });

    describe('ログイン', () => {
      it('ログイン用のポップアップが表示されること', () => {
        loginPage.clickLoginButton().then(() => {
          appPage.setIgnoreSynchronization(true);
          return appPage.getAllWindowHandles();
        }).then((handles) => {
          return appPage.switchWindow(handles[handles.length - 1]);
        }).then(() => {
          return loginPage.getGoogleAuthSubtext();
        }).then((text) => {
          return expect(text).toMatch(firebaseConfig.authDomain);
        });
      });

      it('Emailが入力できること', () => {
        const email = accountConfig.email;
        loginPage.setGoogleAuthEmail(email).then(() => {
          return loginPage.clickGoogleAuthNext();
        }).then(() => {
          expect(loginPage.getGoogleAuthIdentifierText()).toEqual(email);
        });
      });

      it('パスワードが入力できること', () => {
        const password = accountConfig.password;
        loginPage.setGoogleAuthPass(password).then(() => {
          return loginPage.clickGoogleAuthPassNext();
        });
      });

      it('認証が完了し、ポップアップが閉じること', () => {
        appPage.wait(() => {
          return appPage.getAllWindowHandles().then((handles) => {
            return 1 === handles.length;
          });
        }).then(() => {
          return appPage.getAllWindowHandles();
        }).then((handles) => {
          appPage.switchWindow(handles[0]);
        });
      });
    });
  });
});
