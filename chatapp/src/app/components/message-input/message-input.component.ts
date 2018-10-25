import { Component, OnInit, Input } from '@angular/core';
import { UserData } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss']
})
export class MessageInputComponent implements OnInit {
  @Input() user: UserData;

  constructor() { }

  ngOnInit() {
  }

}
