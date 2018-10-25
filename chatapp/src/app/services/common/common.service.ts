import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DataStoreService } from "../data-store/data-store.service";

export class CommonData {
  constructor(data?: {[key: string]: any}) {
    if (data) {
      // 引数で受け取ったオブジェクトを自身のパラメータにコピー
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      })
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