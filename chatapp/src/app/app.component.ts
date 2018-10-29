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
    // 多言語リソースを読み込み
    this.loadI18nResouces();
    // デフォルトの言語を日本語に設定
    this.translate.setDefaultLang('ja');
    // ローカルストレージに保存された言語に切り替え
    this.translate.use(I18nService.getLang());
  }

  /** 多言語リソースを読み込み */
  private loadI18nResouces() {
    SupportedLangs.forEach((lang) => {
      const resouce = I18nService.getResource(lang.code);
      this.translate.setTranslation(lang.code, resouce);
    });
  }
}
