import { by, element } from 'protractor';
import { AppPage } from './app.po';

namespace selectors {
  export const component = 'app-groups';
  export const button = component + ' .groups_button';
  export const selections = component + ' .groups_selection';

  export const dialogComponent = 'app-groups-register-dialog';
  export const dialog = {
    title: dialogComponent + ' .dialog_title',
    cancel: dialogComponent + ' .dialog_actions_cancel',
    create: dialogComponent + ' .dialog_actions_create',
    input: dialogComponent + ' .dialog_content_form_input'
  };
}

export class GroupsPage {
  private appPage: AppPage;
  private dialogPage: GroupRegisterDialogPage;

  constructor() {
    this.appPage = new AppPage();
    this.dialogPage = new GroupRegisterDialogPage();
  }
  
  clickAddButton() {
    return element(by.css(selectors.button)).click();
  }

  isPresentDialog() {
    return element(by.css(selectors.dialogComponent)).isPresent();
  }

  private isPresentSelections() {
    return element(by.css(selectors.selections)).isPresent();
  }

  getSelectionsText() {
    return this.appPage.wait(() => {
      return this.isPresentSelections();
    }).then(() => {
      return element(by.css(selectors.selections)).getText();
    });
  }


  getDialogTitleText() {
    return this.dialogPage.getTitleText();
  }

  clickDialogCancelButton() {
    return this.dialogPage.clickCancel();
  }

  clickDialogCreateButton() {
    return this.dialogPage.clickCreate();
  }

  getDialogGroupNameText() {
    return this.dialogPage.getGroupNameText();
  }

  setDialogGroupName(name: string) {
    return this.dialogPage.setGroupName(name);
  }

  clearDialogGroupName() {
    return this.dialogPage.clearGroupName();
  }
}

class GroupRegisterDialogPage {
  private appPage: AppPage;

  constructor() {
    this.appPage = new AppPage();
  }

  private isPresentTitle() {
    return element(by.css(selectors.dialog.title)).isPresent();
  }

  getTitleText() {
    return this.appPage.wait(() => {
      return this.isPresentTitle();
    }).then(() => {
      return element(by.css(selectors.dialog.title)).getText();
    });
  };

  clickCancel() {
    return element(by.css(selectors.dialog.cancel)).click();
  }

  clickCreate() {
    return element(by.css(selectors.dialog.create)).click();
  }

  private isPresentInput() {
    return element(by.css(selectors.dialog.input)).isPresent();
  }

  getGroupNameText() {
    return this.appPage.wait(() => {
      return this.isPresentInput();
    }).then(() => {
      return element(by.css(selectors.dialog.input)).getAttribute('value');
    });
  }

  setGroupName(name: string) {
    return element(by.css(selectors.dialog.input)).sendKeys(name);
  }

  clearGroupName() {
    return element(by.css(selectors.dialog.input)).clear();
  }
}