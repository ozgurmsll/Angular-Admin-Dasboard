import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoutputComponent } from './productoutput.component';

describe('ProductoutputComponent', () => {
  let component: ProductoutputComponent;
  let fixture: ComponentFixture<ProductoutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
