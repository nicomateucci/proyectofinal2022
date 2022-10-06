import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrouselComponentComponent } from './carrousel-component.component';

describe('CarrouselComponentComponent', () => {
  let component: CarrouselComponentComponent;
  let fixture: ComponentFixture<CarrouselComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrouselComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrouselComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
