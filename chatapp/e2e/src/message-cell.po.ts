import { by, element, ElementFinder } from 'protractor';
import { AppPage } from './app.po';

namespace selectors {
  export const component = 'app-message-cell';
  export const body = component + ' .message_texts_body';
  export const name = component + ' .message_texts_metadata_name';
  export const email = component + ' .message_texts_metadata_email';
  export const date = component + ' .message_texts_metadata_date';
}

export class MessageCellPage {
  private appPage: AppPage;

  constructor() {
    this.appPage = new AppPage();
  }

  getBodyTextByElement(elem: ElementFinder) {
    return elem.element(by.css(selectors.body)).getText();
  }

  getNameTextByElement(elem: ElementFinder) {
    return elem.element(by.css(selectors.name)).getText();
  }

  getEmailTextByElement(elem: ElementFinder) {
    return elem.element(by.css(selectors.email)).getText();
  }

  getDateTextByElement(elem: ElementFinder) {
    const elemFinder = elem.element(by.css(selectors.date));
    // 投稿時間はサーバ時間を利用するため取得までに時間がかかる
    return this.appPage.wait(() => {
      return elemFinder.getText().then((text) => {
        return text && 0 < text.length;
      });
    }).then(() => {
      return elemFinder.getText();
    });
  }
}