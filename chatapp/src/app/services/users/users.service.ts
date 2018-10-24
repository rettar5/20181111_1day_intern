import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SnapshotData, FirestoreKeys } from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private afs: AngularFirestore) { }

  /** ユーザ情報をFirestoreにセット
   *
   * @param profile Googleで認証した際に取得したユーザ情報
   */
  setUserData(profile: GoogleUserProfile): Promise<void> {
    const doc = this.afs.doc<UserData>(FirestoreKeys.users + '/' + profile.id);
    return doc.set(profile);
  }

  /** Firestore内のユーザ情報を監視
   *
   * @param obsrever ユーザ情報に変更があった際のコールバック
   * @param error エラーが発生した際のコールバック
   * @param complete
   */
  observeUserData(obsrever: (snapshot: firebase.firestore.QuerySnapshot) => void, error?: (error: Error) => void, complete?: () => void): () => void {
    return this.afs.collection(FirestoreKeys.users).ref.orderBy('id').limit(100).onSnapshot(obsrever, error, complete);
  }
}

export interface GoogleUserProfile {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  link: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export class UserData extends SnapshotData implements GoogleUserProfile {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  link: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;

  constructor(snapshot: firebase.firestore.QueryDocumentSnapshot) {
    super(snapshot);
  }
}
