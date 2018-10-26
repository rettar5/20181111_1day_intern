import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageCellComponent } from './message-cell.component';

describe('MessageCellComponent', () => {
  let component: MessageCellComponent;
  let fixture: ComponentFixture<MessageCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
