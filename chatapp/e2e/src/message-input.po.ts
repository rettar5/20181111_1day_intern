import { by, element, Key } from 'protractor';
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

  setMessage(message: string) {
    return element(by.css(selectors.fieldInput)).sendKeys(message);
  }

  clickPostButton() {
    return element(by.css(selectors.button)).click();
  }

  sendEnterKey() {
    return element(by.css(selectors.fieldInput)).sendKeys(Key.ENTER);
  }
}