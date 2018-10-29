import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nService, SupportedLangs } from './services/i18n/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ja');
    this.loadI18nResouces();
  }

  /** 多言語リソースを読み込み */
  private loadI18nResouces() {
    SupportedLangs.forEach((lang) => {
      const resouce = I18nService.getResource(lang);
      this.translate.setTranslation(lang, resouce);
    });
  }
}
