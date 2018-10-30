import { TestBed } from '@angular/core/testing';

import { I18nService } from './i18n.service';
import { LocalStorageKey } from '../data-store/data-store.service';

describe('I18nService', () => {
  const resouces = {
    '@Login': {
      'login': {
        'ja': 'ログイン',
        'en': 'Login',
        'zh-cmn-Hans': '登录'
      },
      'logout': {
        'en': null,
        'zh-cmn-Hans': '登出'
      }
    }
  };

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: I18nService = TestBed.get(I18nService);
    expect(service).toBeTruthy();
  });

  describe('getResource()', () => {
    it('指定した言語のリソースが取得取得できること', () => {
      const resouce = I18nService.getResource('zh-cmn-Hans', resouces);
      const zhResource = {
        '@Login': {
          'login': '登录',
          'logout': '登出'
        }
      };
      expect(JSON.stringify(resouce)).toBe(JSON.stringify(zhResource));
    });

    it('リソースを取得する際に、nullを含まないこと', () => {
      const resouce = I18nService.getResource('en', resouces);
      const enResource = {
        '@Login': {
          'login': 'Login',
        }
      };
      expect(JSON.stringify(resouce)).toBe(JSON.stringify(enResource));
    });

    it('リソースを取得する際に、undefinedを含まないこと', () => {
      const resouce = I18nService.getResource('ja', resouces);
      const jaResource = {
        '@Login': {
          'login': 'ログイン',
        }
      };
      expect(JSON.stringify(resouce)).toBe(JSON.stringify(jaResource));
    });
  });

  describe('setLang()', () => {
    it('指定した言語情報がローカルストレージに保存されること', () => {
      I18nService.setLang('zh-cmn-Hans');
      expect(localStorage.getItem(LocalStorageKey.lang)).toBe('zh-cmn-Hans');
    });
  });

  describe('getLang()', () => {
    it('ローカルストレージに保存された言語情報が取得できること', () => {
      localStorage.setItem(LocalStorageKey.lang, 'zh-cmn-Hans');
      expect(I18nService.getLang()).toBe('zh-cmn-Hans');
    });
  });
});
