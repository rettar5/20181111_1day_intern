import { by, element, Key, browser } from 'protractor';
import { AppPage } from './app.po';

namespace selectors {
  export const component = 'app-message-input';
  export const fieldInput = component + ' .form_field_input';
  export const button = component + ' .form_button';
}

export class MessageInputPage {
  private appPage: AppPage;

  constructor() {
    this.appPage = new AppPage();
  }

  setMessage(message: string, hasEmoji: boolean = false) {
    if (hasEmoji) {
      return this.setMessageByScript(message);
    } else {
      // TODO: メッセージを入力する
    }
  }

  private setMessageByScript(message: string) {
    return this.appPage.setTextByScript(element(by.css(selectors.fieldInput)), message);
  }

  clickPostButton() {
    // TODO: クリックする
  }

  sendEnterKey() {
    // TODO: Enterキーを入力する
  }
}