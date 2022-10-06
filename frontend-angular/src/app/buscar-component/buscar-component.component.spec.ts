import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarComponentComponent } from './buscar-component.component';

describe('BuscarComponentComponent', () => {
  let component: BuscarComponentComponent;
  let fixture: ComponentFixture<BuscarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
