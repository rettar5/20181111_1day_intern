import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppModuleDeclarations, AppModuleImports } from '../../app.module';

import { LoginUserProfileComponent } from './login-user-profile.component';

describe('LoginUserProfileComponent', () => {
  let component: LoginUserProfileComponent;
  let fixture: ComponentFixture<LoginUserProfileComponent>;

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
    fixture = TestBed.createComponent(LoginUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
