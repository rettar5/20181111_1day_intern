import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { APP_BASE_HREF } from '@angular/common';
import { AppModuleDeclarations, AppModuleImports } from '../../app.module';

import { UsersService } from './users.service';

describe('UsersService', () => {
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
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });
});
