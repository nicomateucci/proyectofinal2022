import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraRecomendacionComponentComponent } from './barra-recomendacion-component.component';

describe('BarraRecomendacionComponentComponent', () => {
  let component: BarraRecomendacionComponentComponent;
  let fixture: ComponentFixture<BarraRecomendacionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarraRecomendacionComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraRecomendacionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
