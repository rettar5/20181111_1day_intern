import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { APP_BASE_HREF } from '@angular/common';
import { AppModuleDeclarations, AppModuleImports } from '../../app.module';

import { GroupsService } from './groups.service';

describe('GroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: AppModuleDeclarations,
    imports: AppModuleImports,
    providers: [
      AngularFirestore,
      {
        provide: APP_BASE_HREF,
        useValue : '/'
      }
    ]
  }));

  it('should be created', () => {
    const service: GroupsService = TestBed.get(GroupsService);
    expect(service).toBeTruthy();
  });
});
