import { by, element } from 'protractor';
import { AppPage } from './app.po';

namespace selectors {
  export const component = 'app-timeline';
  export const timeline = component + ' .timeline';
  export const progress = component + ' .timeline_progress';
  export const cell = component + ' .timeline_messages_cell';
  export const empty = component + ' .timeline_empty';
}

export class TimelinePage {
  private appPage: AppPage;

  constructor() {
    this.appPage = new AppPage();
  }

  private isPresentTimeline() {
    return element(by.css(selectors.timeline)).isPresent();
  }

  private isPresentProgress() {
    return element(by.css(selectors.progress)).isPresent();
  }

  waitTimelineLoad() {
    return this.appPage.wait(() => {
      return this.isPresentTimeline();
    }).then(() => {
      return this.appPage.wait(() => {
        return this.isPresentProgress().then((isPresent) => {
          return false === isPresent;
        });
      });
    });
  }

  getLastMessageElement() {
    return this.waitTimelineLoad().then(() => {
      return element.all(by.css(selectors.cell)).last();
    });
  }

  isPresentEmpty() {
    return element(by.css(selectors.empty)).isPresent();
  }
}