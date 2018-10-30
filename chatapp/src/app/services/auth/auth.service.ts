import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { DataStoreService } from "../data-store/data-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  logout() {
    // ローカルストレージに保存したすべてのデータを削除
    DataStoreService.clear();
    // ログイン画面に遷移
    this.router.navigate(['/login']);
  }
}
