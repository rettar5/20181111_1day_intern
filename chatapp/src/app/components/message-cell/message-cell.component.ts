import { Component, OnInit, Input } from '@angular/core';
import { MessageData } from 'src/app/services/messages/messages.service';
import { UserData } from 'src/app/services/users/users.service';
import { BaseComponent } from '../base/base.component';
import { DummyImagePath, Animations } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-message-cell',
  templateUrl: './message-cell.component.html',
  styleUrls: ['./message-cell.component.scss'],
  animations: [ Animations.Fadein ]
})
export class MessageCellComponent extends BaseComponent implements OnInit {
  @Input() user: UserData;
  @Input() message: MessageData;

  dummyImagePath = DummyImagePath;

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
