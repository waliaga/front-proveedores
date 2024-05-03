import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMaterialesDetalleComponent } from './ver-materiales-detalle.component';

describe('VerMaterialesDetalleComponent', () => {
  let component: VerMaterialesDetalleComponent;
  let fixture: ComponentFixture<VerMaterialesDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMaterialesDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMaterialesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
