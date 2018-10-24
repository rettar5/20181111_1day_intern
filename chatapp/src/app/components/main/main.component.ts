import { Component, OnInit } from '@angular/core';
import { UsersService, UserData } from 'src/app/services/users/users.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {
  /** ユーザ情報の一覧 */
  userDataMap: Map<string, UserData> = new Map();
  /** メニューの表示フラグ */
  shouldShowMenu: boolean = true;

  constructor(private users: UsersService) {
    super();
  }

  ngOnInit() {
    this.observeUserData();
  }

  /** Firestoreからユーザ情報を取得・変更を監視 */
  private observeUserData() {
    // ユーザ情報の一覧を取得
    const unsubscribeFunc = this.users.observeUserData((snapshot: firebase.firestore.QuerySnapshot) => {
      // 一覧からユーザ情報を1件ずつ取得
      snapshot.forEach((documentSnapshot: firebase.firestore.QueryDocumentSnapshot) => {
        const userData = new UserData(documentSnapshot);
        this.userDataMap.set(userData.id, userData);
      });
    });

    this.setAutoStopSubscription(unsubscribeFunc);
  }
}
