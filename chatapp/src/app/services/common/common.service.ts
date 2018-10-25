
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