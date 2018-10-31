import { by, element } from 'protractor';

const selector = 'app-login';

export class LoginPage {
  getLoginButtonText() {
    return element(by.css(selector + ' .login_contents_button')).getText();
  }

  clickLangButton(lang: string) {
    return element(by.css(selector + ' .login_contents_i18n_lang.' + lang)).click();
  }

  clickLoginButton() {
    return element(by.css(selector + ' .login_contents_button')).click();
  }

  isPresentAuthPopupSubtext() {
    return element(by.css('#headingSubtext')).isPresent();
  }

  getAuthPopupSubtext() {
    return element(by.css('#headingSubtext')).getText();
  }

  setAuthPopupEmail(email: string) {
    return element(by.css('#identifierId')).sendKeys(email);
  }

  clickAuthPopupNext() {
    return element(by.css('#identifierNext')).click();
  }

  isPresentAuthPopupIdentifier() {
    return element(by.css('#profileIdentifier')).isPresent();
  }

  getAuthPopupIdentifierText() {
    return element(by.css('#profileIdentifier')).getText();
  }

  setAuthPopupPass(password: string) {
    return element(by.css('#password input')).sendKeys(password);
  }

  clickAuthPopupPassNext() {
    return element(by.css('#passwordNext')).click();
  }
}
