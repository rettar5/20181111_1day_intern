import { TestBed } from '@angular/core/testing';
import { CommonData } from './common.service';

describe('CommonData', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  describe('copyParams()', () => {
    const hosimiya = new CommonData();
    hosimiya['last'] = '星宮';
    hosimiya['first'] = 'いちご';
    const kiriya = new CommonData();
    kiriya['first'] = 'あおい';

    const copied = hosimiya;

    it('コピー元の値で上書きされていること', () => {
      hosimiya.copyParams(kiriya);
      expect(hosimiya['first']).toBe(kiriya['first']);
    });

    it('オブジェクトの参照が変わらないこと', () => {
      copied['last'] = '霧矢';
      expect(hosimiya['last']).toBe('霧矢');
    });
  });
});
