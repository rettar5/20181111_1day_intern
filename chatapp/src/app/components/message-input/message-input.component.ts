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

  isProcessing: boolean = false;
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

  /** 入力欄でEnterキーがkeyupされた際
   *
   * @param event
   */
  onEnterKeyup(event: KeyboardEvent) {
    this.postMessage();
  }

  /** 入力欄からカーソルが離れた際
   *
   * @param event
   */
  onInputBlur(event: FocusEvent) {
    // カーソルが離れた時は、入力欄をデフォルトの表示に戻す
    this.control.markAsUntouched();
  }

  /** メッセージを投稿 */
  private postMessage() {
    if (!this.isProcessing) {
      this.isProcessing = true;
      const text = this.control.value;
      const userId = this.user.id;
      const groupId = this.group.id;

      this.messages.addMessage(groupId, text, userId).then(() => {
        this.control.reset();
        this.isProcessing = false;
      }).catch((reason) => {
        console.error(reason);
        this.isProcessing = false;
      });
    }
  }
}
