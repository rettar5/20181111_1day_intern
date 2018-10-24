
export class CommonData {
  constructor(data: {[key: string]: any}) {
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

  constructor(snapshot: firebase.firestore.QueryDocumentSnapshot) {
    super(snapshot.data());
    this.id = snapshot.id;
  }
}

export enum FirestoreKeys {
  users = 'users'
}