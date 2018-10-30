import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppModuleDeclarations, AppModuleImports } from '../../app.module';

import { MessageInputComponent } from './message-input.component';

describe('MessageInputComponent', () => {
  let component: MessageInputComponent;
  let fixture: ComponentFixture<MessageInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: AppModuleDeclarations,
      imports: AppModuleImports,
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onEnterKeydown()', () => {
    it('入力されたキーコードが保存されること', () => {
      expect(component.enterKeyCode).toBeUndefined();

      const rand = Math.floor(Math.random() * 100);
      component.onEnterKeydown({ which: rand } as KeyboardEvent);
      expect(component.enterKeyCode).toBe(rand);
    });
  });
});
