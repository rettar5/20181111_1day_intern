import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SnapshotData, FirestoreKeys } from '../common/common.service';
import { UserData } from '../users/users.service';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private afs: AngularFirestore) { }

  /** グループにメッセージを追加
   *
   * @param groupId 投稿先のグループID
   * @param text 投稿するメッセージ
   * @param userId 投稿するユーザID
   */
  addMessage(groupId: string, text: string, userId: string): Promise<firestore.DocumentReference>  {
    const message = new MessageData();
    message.text = text;
    message.createdBy = this.afs.doc(FirestoreKeys.users + '/' + userId).ref;
    message.createdAt = firestore.FieldValue.serverTimestamp();
    message.updatedAt = firestore.FieldValue.serverTimestamp();
    const collectionKey = this.getMessagesCollectionKey(groupId);

    return this.afs.collection(collectionKey).add(Object.assign({}, message));
  }

  /** messagesの参照を取得
   *
   * @param groupId 参照を取得するグループID
   */
  private getMessagesCollectionKey(groupId: string): string {
    return FirestoreKeys.groups + '/' + groupId + '/' + FirestoreKeys.messages;;
  }

  /** グループに投稿されたメッセージを監視
   *
   * @param groupId 監視するグループのID
   * @param obsrever グループ情報に変更があった際のコールバック
   * @param error エラーが発生した際のコールバック
   * @param complete
   */
  observeGroupsInfo(groupId: string, obsrever: (snapshot: firebase.firestore.QuerySnapshot) => void, error?: (error: Error) => void, complete?: () => void): () => void {
    const collectionKey = this.getMessagesCollectionKey(groupId);
    return this.afs.collection(collectionKey).ref.orderBy('createdAt').limit(100).onSnapshot(obsrever, error, complete);
  }
}

export class MessageData extends SnapshotData {
  text: string;
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