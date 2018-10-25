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
    return this.afs.collection(FirestoreKeys.groupsInfo).ref.orderBy('updatedAt', 'desc').limit(100).onSnapshot(obsrever, error, complete);
  }

  /** グループを新規作成
   *
   * @param groupName 作成するグループ名
   * @param userId グループの作成ユーザID
   */
  addGroupsInfo(groupName: string, userId: string): Promise<firestore.DocumentReference> {
    const group = new GroupData();
    group.name = groupName;
    group.createdBy = this.afs.doc(FirestoreKeys.users + '/' + userId).ref;
    group.createdAt = firestore.FieldValue.serverTimestamp();
    group.updatedAt = firestore.FieldValue.serverTimestamp();
    return this.afs.collection(FirestoreKeys.groupsInfo).add(Object.assign({}, group));
  }
}

export class GroupData extends SnapshotData {
  name: string;
  createdBy: UserData | firebase.firestore.DocumentReference | string;
  createdAt: number | firestore.FieldValue;
  updatedAt: number | firestore.FieldValue;

  constructor(snapshot?: firebase.firestore.QueryDocumentSnapshot | firebase.firestore.DocumentSnapshot) {
    super(snapshot);

    if (this.createdBy && (this.createdBy instanceof firestore.DocumentReference)) {
      // createdByの参照からユーザ情報を取得
      (this.createdBy as firebase.firestore.DocumentReference).get().then((snapshot) => {
        this.createdBy = new UserData(snapshot);
      });
    }
  }
}