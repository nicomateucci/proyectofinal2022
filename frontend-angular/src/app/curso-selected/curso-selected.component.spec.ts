import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoSelectedComponent } from './curso-selected.component';

describe('CursoSelectedComponent', () => {
  let component: CursoSelectedComponent;
  let fixture: ComponentFixture<CursoSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
