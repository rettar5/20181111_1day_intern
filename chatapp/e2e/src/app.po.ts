import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path: string = '/') {
    return browser.get(path);
  }

  sleep(ms: number = 10 * 1000) {
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
}
