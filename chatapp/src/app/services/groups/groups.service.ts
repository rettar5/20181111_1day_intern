import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreKeys, SnapshotData } from '../common/common.service';
import { UserData } from '../users/users.service';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private afs: AngularFirestore) { }

  /** Firestore内のグループ情報を監視
   *
   * @param obsrever グループ情報に変更があった際のコールバック
   * @param error エラーが発生した際のコールバック
   * @param complete
   */
  observeGroupsInfo(obsrever: (snapshot: firebase.firestore.QuerySnapshot) => void, error?: (error: Error) => void, complete?: () => void): () => void {
    // TODO: orderをupdatedAtの降順にする
    return this.afs.collection(FirestoreKeys.groupsInfo).ref.orderBy('createdAt', 'desc').limit(100).onSnapshot(obsrever, error, complete);
  }
}

export class GroupData extends SnapshotData {
  name: string;
  createdBy: UserData | firebase.firestore.DocumentReference;

  constructor(snapshot: firebase.firestore.QueryDocumentSnapshot | firebase.firestore.DocumentSnapshot) {
    super(snapshot);

    if (this.createdBy && (this.createdBy instanceof firestore.DocumentReference)) {
      // createdByの参照からユーザ情報を取得
      (this.createdBy as firebase.firestore.DocumentReference).get().then((snapshot) => {
        this.createdBy = new UserData(snapshot);
      });
    }
  }
}