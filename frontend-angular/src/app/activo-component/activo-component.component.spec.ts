import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoComponentComponent } from './activo-component.component';

describe('ActivoComponentComponent', () => {
  let component: ActivoComponentComponent;
  let fixture: ComponentFixture<ActivoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivoComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
