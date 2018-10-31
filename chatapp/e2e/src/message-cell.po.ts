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

  getBodyTextFromElement(elem: ElementFinder) {
    return elem.element(by.css(selectors.body)).getText();
  }

  getNameTextFormElement(elem: ElementFinder) {
    return elem.element(by.css(selectors.name)).getText();
  }

  getEmailTextFormElement(elem: ElementFinder) {
    return elem.element(by.css(selectors.email)).getText();
  }

  getDateTextFormElement(elem: ElementFinder) {
    return elem.element(by.css(selectors.date)).getText();
  }
}