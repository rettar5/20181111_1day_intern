import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { MessagesService, MessageData } from 'src/app/services/messages/messages.service';
import { UserData } from 'src/app/services/users/users.service';
import { GroupData } from 'src/app/services/groups/groups.service';
import { BaseComponent } from '../base/base.component';
import { Animations } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [ Animations.Fadein ]
})
export class TimelineComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() user: UserData;
  @Input() group: GroupData;

  @Output('onInit') onInitEmitter: EventEmitter<null> = new EventEmitter();
  @Output('onLoad') onLoadEmitter: EventEmitter<null> = new EventEmitter();

  /** 取得したメッセージのマップ */
  messageDataMap: Map<string, MessageData> = new Map();
  /** 取得したメッセージの配列 */
  messageDataList: Array<MessageData> = [];
  /** データ読込中フラグ */
  isLoading: boolean = true;
  /** メッセージの監視停止用の関数 */
  private stopObserveFunc: () => void;

  constructor(private messages: MessagesService) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.stopObserveMessages();
    this.messageDataMap.clear();
    this.messageDataList = [];

    if (this.group && this.group.id) {
      this.observeMessages(this.group.id);
    }
  }

  /** グループに投稿されたメッセージを監視
   *
   * @param groupId メッセージを監視するグループID
   */
  private observeMessages(groupId: string) {
    this.isLoading = true;
    this.stopObserveFunc = this.messages.observeGroupsInfo(groupId, (querySnapshot) => {
      querySnapshot.forEach((queryDocumentSnapshot) => {
        const fetchedMessage = new MessageData(queryDocumentSnapshot);

        const storedMessage = this.messageDataMap.get(fetchedMessage.id);
        if (storedMessage) {
          // オブジェクトの参照を変えずにデータを更新する
          storedMessage.copyParams(fetchedMessage);
        } else {
          // 未取得のデータであれば追加
          this.messageDataList.push(fetchedMessage);
          this.messageDataMap.set(fetchedMessage.id, fetchedMessage);
        }
      });

      if (this.isLoading) {
        this.emitOnInit();
      } else {
        this.emitOnLoad();
      }
      this.isLoading = false;
    }, (error) => {
      console.error(error);
    });
  }

  /** メッセージの監視を停止 */
  private stopObserveMessages() {
    if (this.stopObserveFunc) {
      this.stopObserveFunc();
      this.stopObserveFunc = null;
    }
  }

  /** メッセージの初回読み込み完了を通知 */
  private emitOnInit() {
    this.onInitEmitter.emit();
  }

  /** メッセージの読み込み完了を通知 */
  private emitOnLoad() {
    this.onLoadEmitter.emit();
  }
}
