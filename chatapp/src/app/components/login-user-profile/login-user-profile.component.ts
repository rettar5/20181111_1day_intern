import { Component, OnInit, Input } from '@angular/core';
import { UserData } from 'src/app/services/users/users.service';
import { DataStoreService } from 'src/app/services/data-store/data-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user-profile',
  templateUrl: './login-user-profile.component.html',
  styleUrls: ['./login-user-profile.component.scss']
})
export class LoginUserProfileComponent implements OnInit {
  @Input() user: UserData;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /** ログアウトのリンクをクリックした際 */
  onLogoutButtonClick(event: MouseEvent) {
    this.logout();
  }

  /** ログアウト */
  private logout() {
    // ローカルストレージに保存したすべてのデータを削除
    DataStoreService.clear();
    // ログイン画面に遷移
    this.router.navigate(['/login']);
  }
}
