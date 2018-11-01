import { by, element } from 'protractor';
import { AppPage } from './app.po';

namespace selectors {
  export const component = 'app-login-user-profile';
  export const userEmail = component + ' .user_texts_email';
  export const logoutLink = component + ' .user_texts_logout_link';
}

export class LoginUserProfilePage {
  private appPage: AppPage;

  constructor() {
    this.appPage = new AppPage();
  }

  private isPresentUserEmail() {
    return element(by.css(selectors.userEmail)).isPresent();
  }

  getUserEmailText() {
    return this.appPage.wait(() => {
      return this.isPresentUserEmail();
    }).then(() => {
      return element(by.css(selectors.userEmail)).getText();
    });
  }

  clickLogoutLink() {
    return element(by.css(selectors.logoutLink)).click();
  }
}