import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('FirebaseService', () => {
  let service: FirebaseService;
  let firestoreSpy: jasmine.SpyObj<Firestore>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Firestore', ['collection']);
    spy.collection.and.returnValue({
      get: () => of({ docs: [] })
    });

    TestBed.configureTestingModule({
      providers: [
        FirebaseService,
        { provide: Firestore, useValue: spy }
      ]
    });
    service = TestBed.inject(FirebaseService);
    firestoreSpy = TestBed.inject(Firestore) as jasmine.SpyObj<Firestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
