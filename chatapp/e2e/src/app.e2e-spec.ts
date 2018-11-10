import { AppPage } from './app.po';
import { LoginPage } from './login.po';

import { firebaseConfig } from '../../src/environments/firebase.config';
import { accountConfig } from '../account.config';
import { LoginUserProfilePage } from './login-user-profile.po';
import { GroupsPage } from './groups.po';
import { TimelinePage } from './timeline.po';
import { MessageCellPage } from './message-cell.po';
import { MessageInputPage } from './message-input.po';

describe('chatapp e2e test', () => {
  let appPage: AppPage;
  let loginPage: LoginPage;
  let loginUserProfilePage: LoginUserProfilePage;
  let groupsPage: GroupsPage;
  let timelinePage: TimelinePage;
  let messageCellPage: MessageCellPage;
  let messageInputPage: MessageInputPage;

  beforeEach(() => {
    appPage = new AppPage();
    loginPage = new LoginPage();
    loginUserProfilePage = new LoginUserProfilePage();
    groupsPage = new GroupsPage();
    timelinePage = new TimelinePage();
    messageCellPage = new MessageCellPage();
    messageInputPage = new MessageInputPage();
  });

  it('ログイン画面が表示されること', () => {
    appPage.navigateTo();
    expect(loginPage.getLoginButtonText()).toEqual('Googleアカウントでログイン');
  });

  describe('ログイン画面', () => {
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
        loginPage.setGoogleAuthEmail(accountConfig.email).then(() => {
          return loginPage.clickGoogleAuthNext();
        }).then(() => {
          expect(loginPage.getGoogleAuthIdentifierText()).toEqual(accountConfig.email);
        });
      });

      it('パスワードが入力できること', () => {
        loginPage.setGoogleAuthPass(accountConfig.password).then(() => {
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

  it('メイン画面が表示されること', () => {
    appPage.waitNaviagte('main').then(() => {
      return appPage.wait(() => {
        return loginUserProfilePage.getUserEmailText().then((text) => {
          return text && 0 < text.length;
        });
      });
    }).then(() => {
      return loginUserProfilePage.getUserEmailText();
    }).then((text) => {
      expect(text).toEqual(accountConfig.email);
    });
  });

  describe('メイン画面', () => {
    let newGroupName: string;
    describe('メッセージ投稿', () => {
      const testCases = [
        {
          base: 'abc123あいうえおアイウエオ安以宇衣於',
          hasEmoji: false
        },
        {
          base: '🍣',
          hasEmoji: true
        }
      ];
      const interval = 500;

      for(const testCase of testCases) {
        /// TODO: 投稿ボタンからメッセージが投稿できること

        // TODO: エンターキーからメッセージが投稿できること
      }
    });

    describe('ログアウト', () => {
      it('ログイン画面が表示されること', () => {
        loginUserProfilePage.clickLogoutLink().then(() => {
          return appPage.waitNaviagte('login');
        }).then(() => {
          return appPage.wait(() => {
            return loginPage.getLoginButtonText().then((text) => {
              return text && 0 < text.length;
            });
          });
        }).then(() => {
          return loginPage.getLoginButtonText();
        }).then((text) => {
          expect(text).toEqual('Googleアカウントでログイン');
        });
      });
    });
  });
});
