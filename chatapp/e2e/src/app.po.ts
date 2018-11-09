import { browser, WebElement, Key } from 'protractor';
import { config } from '../protractor.conf';

export class AppPage {
  navigateTo(path: string = '/') {
    return browser.get(path);
  }

  waitNaviagte(path: string, ms?: number) {
    return this.wait(() => {
      return browser.getCurrentUrl().then((url) => {
        return config.baseUrl + path === url;
      });
    }, ms);
  }

  getAppRoot() {
    return browser.angularAppRoot();
  }

  sleep(ms: number = 1 * 1000) {
    return browser.sleep(ms);
  }

  getAllWindowHandles() {
    return browser.getAllWindowHandles();
  }

  switchWindow(handle) {
    return browser.switchTo().window(handle);
  }

  wait(fn: () => void, ms: number = 10 * 1000) {
    return browser.wait(() => {
      return fn();
    }, ms);
  }

  setIgnoreSynchronization(isIgnore: boolean) {
    browser.ignoreSynchronization = isIgnore;
  }

  setTextByScript(element: WebElement, message: string) {
    return browser.executeScript((elem, str) => {
      elem.value = str;
    }, element, message).then(() => {
      // 空文字を入力し、フォームをDirtyにする
      element.sendKeys(' ');
    }).then(() => {
      element.sendKeys(Key.BACK_SPACE);
    });
  }
}
