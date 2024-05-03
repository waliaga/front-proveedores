import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipal } from './pagina-principal';

describe('Layout1Component', () => {
  let component: PaginaPrincipal;
  let fixture: ComponentFixture<PaginaPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPrincipal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
