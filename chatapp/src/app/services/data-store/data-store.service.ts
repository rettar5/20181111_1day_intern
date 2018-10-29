export class DataStoreService {
  /** ローカルストレージからオブジェクトを取得
   *
   * @param key
   */
  static getItem(key: LocalStorageKey): string {
    return localStorage.getItem(key);
  }

  /** ローカルストレージへ文字列を格納
   *
   * @param key
   * @param data
   */
  static setItem(key: LocalStorageKey, data: string) {
    localStorage.setItem(key, data);
  }

  /** ローカルストレージのオブジェクトを削除
   *
   * @param key
   */
  static removeItem(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }

  /** ローカルストレージ内のアプリ用のオブジェクトをすべて削除 */
  static clear() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.match(LocalStorageKey.prefix)) {
        this.removeItem(key as LocalStorageKey);
      }
    }
  }
}

export enum LocalStorageKey {
  prefix = 'chatapp',
  loginId = 'chatapp.login.id',
  lang = 'lang'
}
