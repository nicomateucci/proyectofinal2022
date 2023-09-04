import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyItemComponent } from './cryptocurrency-item.component';

describe('CryptocurrencyItemComponent', () => {
  let component: CryptocurrencyItemComponent;
  let fixture: ComponentFixture<CryptocurrencyItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptocurrencyItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptocurrencyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
