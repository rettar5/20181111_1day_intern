import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { APP_BASE_HREF } from '@angular/common';
import { AppModuleDeclarations, AppModuleImports } from '../../app.module';

import { LoginComponent } from './login.component';
import { I18nService, SupportedLangs } from 'src/app/services/i18n/i18n.service';

const I18nResources = require('../../../assets/i18n/global.json');

class FakeRouter {}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: AppModuleDeclarations,
      imports: AppModuleImports,
      providers: [
        AngularFireAuth,
        {
          provide: Router,
          useClass: FakeRouter
        },
        AngularFirestore,
        {
          provide: APP_BASE_HREF,
          useValue : '/'
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changeLang()', () => {
    SupportedLangs.forEach((lang) => {
      it('使用言語が' + lang.label + 'に変わること', () => {
        component.changeLang(lang.code);
        expect(component.translate.currentLang).toBe(lang.code);
      });

      it('「Googleアカウントでログイン」が' + lang.label + 'に変換できること', () => {
        component.changeLang(lang.code);
        // 各言語のリソースを読み込み
        const resouce = I18nService.getResource(lang.code);
        component.translate.setTranslation(lang.code, resouce);

        const componentKey = '@Login';
        const labelKey = 'loginByGoogle';
        component.translate.get(componentKey + '.' + labelKey).subscribe((res: string) => {
          expect(res).toBe(I18nResources[componentKey][labelKey][lang.code]);
        });
      });
    });
  });
});
