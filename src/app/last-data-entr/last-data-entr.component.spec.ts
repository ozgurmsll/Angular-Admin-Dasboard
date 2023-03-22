import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDataEntrComponent } from './last-data-entr.component';

describe('LastDataEntrComponent', () => {
  let component: LastDataEntrComponent;
  let fixture: ComponentFixture<LastDataEntrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastDataEntrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastDataEntrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
