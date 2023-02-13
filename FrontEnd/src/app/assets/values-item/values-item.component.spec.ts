import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuesItemComponent } from './values-item.component';

describe('ValuesItemComponent', () => {
  let component: ValuesItemComponent;
  let fixture: ComponentFixture<ValuesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValuesItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValuesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
