import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeProveedorComponent } from './registro-de-proveedor.component';

describe('RegistroDeProveedorComponent', () => {
  let component: RegistroDeProveedorComponent;
  let fixture: ComponentFixture<RegistroDeProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroDeProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroDeProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
