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
    describe('グループ新規作成', () => {
      let registerdGroupName: string;

      it('初期処理', () => {
        newGroupName = 'E2E テスト ' + Math.floor(Math.random() * 100);
        groupsPage.getSelectionsText().then((text) => {
          registerdGroupName = text;
        });
      });

      it('ボタンをクリックすると、新規作成のダイアログが表示されること', () => {
        groupsPage.clickAddButton().then(() => {
          return groupsPage.getDialogTitleText();
        }).then((title) => {
          expect(title).toEqual('グループの新規作成');
        });
      });

      it('キャンセルをクリックすると、ダイアログが閉じること', () => {
        groupsPage.clickDialogCancelButton().then(() => {
          return appPage.sleep(1 * 1000);
        }).then(() => {
          expect(groupsPage.isPresentDialog()).toBeFalsy();
        });
      });

      it('グループが作成されていないこと', () => {
        groupsPage.getSelectionsText().then((text) => {
          expect(text).toEqual(registerdGroupName);
        });
      });

      it('ダイアログが表示された際に、デフォルトのグループ名が入力されていること', () => {
        groupsPage.clickAddButton().then(() => {
          return groupsPage.getDialogGroupNameText();
        }).then((text) => {
          /** 作成済みのグループ数 */
          const groupNum = (registerdGroupName || '').split('\n').length;
          expect(text).toEqual('グループ ' + (groupNum + 1));
        });
      });

      it('作成をクリックすると、ダイアログが閉じること', () => {
        groupsPage.clearDialogGroupName().then(() => {
          return groupsPage.setDialogGroupName(newGroupName);
        }).then(() => {
          return groupsPage.clickDialogCreateButton();
        }).then(() => {
          return appPage.wait(() => {
            return groupsPage.isPresentDialog().then((isPresent) => {
              return false === isPresent;
            });
          });
        }).then(() => {
          return groupsPage.isPresentDialog();
        }).then((isPresent) => {
          expect(isPresent).toBeFalsy();
        });
      });

      it('指定した名前でグループが作成されていること', () => {
        appPage.wait(() => {
          return groupsPage.getSelectionsText().then((text) => {
            return registerdGroupName !== text;
          });
        }).then(() => {
          return groupsPage.getSelectionsText();
        }).then((text) => {
          expect(text).toEqual(registerdGroupName + '\n' + newGroupName);
        });
      });
    });

    describe('タイムライン切り替え', () => {
      it('最後に投稿されたメッセージを取得', () => {
        timelinePage.getLastMessageElement().then((elem) => {
          expect(elem).toBeTruthy();
        });
      });

      it('作成したグループに切り替え', () => {
        groupsPage.clickGroupByText(newGroupName);
      });

      it('メッセージが投稿されていないこと', () => {
        timelinePage.waitTimelineLoad().then(() => {
          expect(timelinePage.isPresentEmpty()).toBeTruthy();
        });
      });
    });

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
        it('投稿ボタンからメッセージが投稿できること', () => {
          const message = testCase.base + ' ' + Date.now();
          appPage.sleep(interval).then(() => {
            return messageInputPage.setMessage(message, testCase.hasEmoji);
          }).then(() => {
            return messageInputPage.clickPostButton();
          }).then(() => {
            return timelinePage.getLastMessageElement();
          }).then((element) => {
            return messageCellPage.getBodyTextFromElement(element);
          }).then((text) => {
            expect(text).toEqual(message);
          });
        });

        it('エンターキーからメッセージが投稿できること', () => {
          const message = testCase.base + ' ' + Date.now();
          appPage.sleep(interval).then(() => {
            return messageInputPage.setMessage(message, testCase.hasEmoji);
          }).then(() => {
            return messageInputPage.sendEnterKey();
          }).then(() => {
            return timelinePage.getLastMessageElement();
          }).then((element) => {
            return messageCellPage.getBodyTextFromElement(element);
          }).then((text) => {
            expect(text).toEqual(message);
          });
        });
      }
    });
  });
});
