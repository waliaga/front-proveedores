import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionDeProveedorComponent } from './edicion-de-proveedor.component';

describe('EdicionDeProveedorComponent', () => {
  let component: EdicionDeProveedorComponent;
  let fixture: ComponentFixture<EdicionDeProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicionDeProveedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicionDeProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
