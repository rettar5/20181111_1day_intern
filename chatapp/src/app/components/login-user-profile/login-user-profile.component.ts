import { Component, OnInit, Input } from '@angular/core';
import { UserData } from 'src/app/services/users/users.service';
import { DummyImagePath } from 'src/app/services/common/common.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-user-profile',
  templateUrl: './login-user-profile.component.html',
  styleUrls: ['./login-user-profile.component.scss']
})
export class LoginUserProfileComponent implements OnInit {
  @Input() user: UserData;
  dummyImagePath = DummyImagePath;

  constructor(private authService: AuthService,
              public  translate: TranslateService) { }

  ngOnInit() {
  }

  /** ログアウトのリンクをクリックした際 */
  onLogoutButtonClick(event: MouseEvent) {
    this.logout();
  }

  /** ログアウト */
  private logout() {
    this.authService.logout();
  }
}
