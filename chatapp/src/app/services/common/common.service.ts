import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DataStoreService } from "../data-store/data-store.service";
import { trigger, transition, style, animate } from "@angular/animations";

export class CommonData {
  constructor(data?: {[key: string]: any}) {
    if (data) {
      // 引数で受け取ったオブジェクトを自身のパラメータにコピー
      this.copyParams(data);
    }
  }

  /** 引数に指定したオブジェクトのパラメータを自身のパラメータにコピー
   *  メッセージの参照を変えずに内容を更新する場合等に利用
   *
   * @param data コピー元のオブジェクト
   */
  copyParams(data: CommonData | {[key: string]: any}) {
    if (data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    }
  }
}

export class SnapshotData extends CommonData {
  id: string;

  constructor(snapshot?: firebase.firestore.QueryDocumentSnapshot) {
    super(snapshot ? snapshot.data() : null);
    if (snapshot) {
      this.id = snapshot.id;
    }
  }
}

export enum FirestoreKeys {
  users = 'users',
  groups = 'groups',
  messages = 'messages',
  groupsInfo = 'groupsInfo'
}

export enum RetryConfig {
  max = 5,
  interval = 3
}

@Injectable({
  providedIn: 'root'
})
export class AuthSsrvice {
  constructor(private router: Router) {}

  logout() {
    // ローカルストレージに保存したすべてのデータを削除
    DataStoreService.clear();
    // ログイン画面に遷移
    this.router.navigate(['/login']);
  }
}

export const DummyImagePath = 'assets/images/dummy.gif';

export interface FirestoreDate {
  seconds: number;
  nanoseconds: number;
}

export class Animations {
  static Fadein = trigger('appear', [
    transition('void => *', [
        style({ opacity: 0 }),
        animate('500ms ease-in')
    ])
  ]);
}