import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-base',
  template: ``
})
export class BaseComponent implements OnDestroy {
  private _unsubscribeFuncList: (() => void)[] = [];

  constructor() { }

  ngOnDestroy() {
    // コンポーネントを破棄する際に、Firestoreの監視を停止
    this._unsubscribeFuncList.forEach((func) => {
      func();
    });
  }

  /** Firestoreの監視を自動停止する一覧に追加
   *
   * @param func onSnapshot()から取得した監視停止用の関数
   */
  setAutoStopSubscription(func: () => void) {
    this._unsubscribeFuncList.push(func);
  }

  /** Mapを配列に変換（AngularのテンプレートからMap型を反復処理できないため）
   *
   * @param map キーにstringを持つMap型
   */
  getArray(map: Map<string, any>): any[] {
    return Array.from(map);
  }
}
