import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraRecomendacionComponent } from './barra-recomendacion.component';

describe('BarraRecomendacionComponent', () => {
  let component: BarraRecomendacionComponent;
  let fixture: ComponentFixture<BarraRecomendacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraRecomendacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraRecomendacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
