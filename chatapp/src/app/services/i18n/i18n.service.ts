import { Injectable } from "@angular/core";

const I18nResources = require('../../../assets/i18n/global.json');

interface I18nResourceType {
  [key: string]: I18nResourceType | string;
}

/** サポートする言語 */
export const SupportedLangs = [
  'ja',
  'en'
];

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  /** 多言語リソースから指定した言語のみを取得
   *
   * @param lang 取得する言語
   */
  static getResource(lang: string): I18nResourceType | null {
    return this.getLocalizedResource(I18nResources, lang) as I18nResourceType || null;
  }

  /** 多言語リソースから、localeが指定されたオブジェクトのみを取得
   *
   * @param data
   * @param lang 取得する言語
   */
  private static getLocalizedResource(data: I18nResourceType | string, lang: string): I18nResourceType | string {
    /** ローカライズされたオブジェクトか文字列が代入される */
    let obj: I18nResourceType | string;
    const keyList = Object.keys(data);
    for (const key of keyList) {
      const value = data[key];
  
      if ('string' === typeof value) {
        // dataの内容が { ja: 'xxx', en: 'yyy' } のケース
        if (this.hasKey(keyList, lang)) {
          // ロケールの内容（文字列）をオブジェクトにセットする
          obj = data[lang];
        }
        break;
      } else if ('object' === typeof value) {
        // dataの中に、さらにオブジェクトが続くケース
        const nested = this.getLocalizedResource(value, lang);
        if (nested) {
          if (!obj) {
            obj = {};
          }
          obj[key] = nested;
        }
      }
    }
    return obj;
  }

  /** 配列にkeyが含まれているか
   *
   * @param keyList オブジェクトのkeyを含む配列
   * @param key
   */
  private static hasKey(keyList: string[], key: string): boolean {
    return keyList.some((listValue) => {
      return key === listValue;
    });
  }
}
