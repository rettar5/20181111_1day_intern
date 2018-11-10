import { by, element } from 'protractor';
import { AppPage } from './app.po';

namespace selectors {
  export const component = 'app-login';
  export const button = component + ' .login_contents_button';
  export const i18nLang = component + ' .login_contents_i18n_lang';

  export const googleAuth = {
    subtext: '#headingSubtext',
    identifierId: '#identifierId',
    identifierNext: '#identifierNext',
    profileIdentifier: '#profileIdentifier',
    passwordInput: '#password input',
    passwordNext: '#passwordNext'
  };
}

export class LoginPage {
  private appPage: AppPage;
  private authPage: GoogleAuthPage;

  constructor() {
    this.appPage = new AppPage();
    this.authPage = new GoogleAuthPage();
  }

  private isPresentLoginButton() {
    return element(by.css(selectors.button)).isPresent();
  }

  getLoginButtonText() {
    return this.appPage.wait(() => {
      return this.isPresentLoginButton();
    }).then(() => {
      return element(by.css(selectors.button)).getText();
    });
  }

  clickLangButton(lang: string) {
    return element(by.css(selectors.i18nLang + '[data-lang="' + lang + '"]')).click();
  }

  clickLoginButton() {
    return element(by.css(selectors.button)).click();
  }


  getGoogleAuthSubtext() {
    return this.authPage.getSubtext();
  }

  setGoogleAuthEmail(email: string) {
    return this.authPage.setEmail(email);
  }

  clickGoogleAuthNext() {
    return this.authPage.clickNext();
  }

  getGoogleAuthIdentifierText() {
    return this.authPage.getIdentifierText();
  }

  setGoogleAuthPass(password: string) {
    return this.authPage.setPass(password);
  }

  clickGoogleAuthPassNext() {
    return this.authPage.clickPassNext();
  }
}

class GoogleAuthPage {
  private appPage: AppPage;

  constructor() {
    this.appPage = new AppPage();
  }

  private isPresentSubtext() {
    return element(by.css(selectors.googleAuth.subtext)).isPresent();
  }

  getSubtext() {
    return this.appPage.wait(() => {
      return this.isPresentSubtext();
    }).then(() => {
      return element(by.css(selectors.googleAuth.subtext)).getText();
    });
  }

  private isPresentIdInput() {
    return element(by.css(selectors.googleAuth.identifierId)).isPresent();
  }

  setEmail(email: string) {
    return this.appPage.wait(() => {
      return this.isPresentIdInput();
    }).then(() => {
      return element(by.css(selectors.googleAuth.identifierId)).sendKeys(email);
    });
  }

  clickNext() {
    return element(by.css(selectors.googleAuth.identifierNext)).click();
  }

  private isPresentIdentifier() {
    return element(by.css(selectors.googleAuth.profileIdentifier)).isPresent();
  }

  getIdentifierText() {
    return this.appPage.wait(() => {
      return this.isPresentIdentifier();
    }).then(() => {
      return this.appPage.sleep();
    }).then(() => {
      return element(by.css(selectors.googleAuth.profileIdentifier)).getText();
    });
  }

  private isPresentPassInput() {
    return element(by.css(selectors.googleAuth.passwordInput)).isPresent();
  }

  setPass(password: string) {
    return this.appPage.wait(() => {
      return this.isPresentPassInput();
    }).then(() => {
      return this.appPage.sleep();
    }).then(() => {
      return element(by.css(selectors.googleAuth.passwordInput)).sendKeys(password);
    });
  }

  private isPresentPassNext() {
    return element(by.css(selectors.googleAuth.passwordNext)).isPresent();
  }

  clickPassNext() {
    return this.appPage.wait(() => {
      return this.isPresentPassNext();
    }).then(() => {
      return element(by.css(selectors.googleAuth.passwordNext)).click();
    });
  }
}