import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserData } from 'src/app/services/users/users.service';
import { GroupData } from 'src/app/services/groups/groups.service';
import { FormControl, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
  @Input() user: UserData;
  @Input() group: GroupData;

  control: FormControl = new FormControl('', Validators.required);

  constructor(private messages: MessagesService) { }

  ngOnInit() {
  }

  /** 投稿ボタンがクリックされた際
   *
   * @param event
   */
  onSubmitButtonClick(event: MouseEvent) {
    this.postMessage();
  }

  /** メッセージを投稿 */
  private postMessage() {
    const text = this.control.value;
    const userId = this.user.id;
    const groupId = this.group.id;

    this.messages.addMessage(groupId, text, userId).then(() => {
      this.control.reset();
    }).catch((reason) => {
      console.error(reason);
    });
  }
}
