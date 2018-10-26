import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { MessagesService, MessageData } from 'src/app/services/messages/messages.service';
import { UserData } from 'src/app/services/users/users.service';
import { GroupData } from 'src/app/services/groups/groups.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() user: UserData;
  @Input() group: GroupData;

  messageDataMap: Map<string, MessageData> = new Map();
  isLoading: boolean = true;
  private stopObserveFunc: () => void;

  constructor(private messages: MessagesService) {
    super();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.stopObserveMessages();
    this.messageDataMap.clear();

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
        const message = new MessageData(queryDocumentSnapshot);
        this.messageDataMap.set(message.id, message);
      });

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
}