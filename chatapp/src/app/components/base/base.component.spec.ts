import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getArray()', () => {
    const map = new Map();
    map.set('user1', '星宮');
    map.set('user2', '霧矢');
    map.set('user3', '紫吹');

    it('Map.keys()がkeyの配列に変換されること', () => {
      const array = component.getArray(map.keys());
      expect(JSON.stringify(array)).toBe(JSON.stringify([ 'user1', 'user2', 'user3' ]));
    });

    it('Map.values()がvalueの配列に変換されること', () => {
      const array = component.getArray(map.values());
      expect(JSON.stringify(array)).toBe(JSON.stringify([ '星宮', '霧矢', '紫吹' ]));
    });

    it('Map.entries()がkeyとvalueの配列に変換されること', () => {
      const array = component.getArray(map.entries());
      expect(JSON.stringify(array)).toBe(JSON.stringify([ ['user1', '星宮'], ['user2', '霧矢'], ['user3', '紫吹'] ]));
    });
  });

  describe('addObserveAutoRemover()', () => {
    let flag = false;
    const func = () => {
      flag = true;
    };

    it('関数が配列に追加されること', () => {
      expect(component.unsubscribeFuncList.length).toBe(0);
      component.addObserveAutoRemover(func);
      expect(component.unsubscribeFuncList.length).toBe(1);
      expect(flag).toBeFalsy();
    });

    it('コンポーネント削除時に、保存された関数が実行されていること', () => {
      // ↑のitが終わる際に `ngOnDestroy()` が呼び出されているため、フラグが更新されているはず
      expect(flag).toBeTruthy();
    });
  });
});
