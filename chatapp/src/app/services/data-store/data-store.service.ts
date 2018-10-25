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

  /** ローカルストレージ内のすべてのオブジェクトを削除 */
  static clear() {
    localStorage.clear();
  }
}

export enum LocalStorageKey {
  loginId = 'chatapp.login.id'
}
