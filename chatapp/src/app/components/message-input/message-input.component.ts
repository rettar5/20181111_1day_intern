import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { UserData } from 'src/app/services/users/users.service';
import { GroupData } from 'src/app/services/groups/groups.service';
import { FormControl, Validators } from '@angular/forms';
import { MessagesService, MessageData } from 'src/app/services/messages/messages.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
  @Input() user: UserData;
  @Input() group: GroupData;

  @Output('onPost') onPostEmitter: EventEmitter<string> = new EventEmitter();

  /** メッセージ投稿処理中フラグ */
  isProcessing: boolean = false;
  /** メッセージ入力欄のフォームコントロール */
  control: FormControl = new FormControl('', Validators.required);
  /** エンターキーのキーコード保存用 */
  enterKeyCode: number;

  constructor(private messages: MessagesService,
              public  translate: TranslateService) { }

  ngOnInit() {
  }

  /** 投稿ボタンがクリックされた際
   *
   * @param event
   */
  onSubmitButtonClick(event: MouseEvent) {
    this.postMessage();
  }

  /** 入力欄でEnterキーが押された際
   *
   * @param event
   */
  onEnterKeydown(event: KeyboardEvent) {
    this.enterKeyCode = event.which;
  }

  /** 入力欄でEnterキーから手が離れた際
   *
   * @param event
   */
  onEnterKeyup(event: KeyboardEvent) {
    // 漢字変換等のEnter入力で投稿されないようチェック
    if (this.enterKeyCode === event.which) {
      this.postMessage();
    }
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
    if (!this.isProcessing && this.control.valid) {
      this.isProcessing = true;
      const text = this.control.value;
      const createdBy = this.user;
      const groupId = this.group.id;
      // 投稿処理中でも一旦空にする
      this.control.setValue('');

      this.messages.addMessage(groupId, text, createdBy).then((docRef) => {
        this.control.reset();
        this.isProcessing = false;
        this.emitOnPost(docRef.id);
      }).catch((reason) => {
        console.error(reason);
        this.control.setValue(text);
        this.isProcessing = false;
      });
    }
  }

  /** メッセージの投稿を通知
   *
   * @param messageId 投稿したメッセージのID
   */
  private emitOnPost(messageId: string) {
    this.onPostEmitter.emit(messageId);
  }
}
