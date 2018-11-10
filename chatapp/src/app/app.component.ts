import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // 多言語リソースを読み込み
    this.loadI18nResouces();
    // TODO: デフォルトの言語を日本語に設定
    // TODO: ローカルストレージに保存された言語に切り替え
  }

  /** 多言語リソースを読み込み */
  private loadI18nResouces() {
    // TODO: リソース読み込み処理の実装
  }
}
