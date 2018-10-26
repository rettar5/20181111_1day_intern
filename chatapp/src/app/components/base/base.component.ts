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
  addObserveAutoRemover(func: () => void) {
    this._unsubscribeFuncList.push(func);
  }

  /** イテレータを配列に変換
   *
   * @param itr Map.values()等で取得したイテレータ
   */
  getArray(itr: IterableIterator<any>): any[] {
    return Array.from(itr);
  }

  /** タイミングをずらして処理を実行
   *
   * @param action
   */
  shiftAction(action: () => void) {
    setTimeout(action);
  }
}
