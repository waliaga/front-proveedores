import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorRegistradoComponent } from './proveedor-registrado.component';

describe('ProveedorRegistradoComponent', () => {
  let component: ProveedorRegistradoComponent;
  let fixture: ComponentFixture<ProveedorRegistradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorRegistradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorRegistradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
