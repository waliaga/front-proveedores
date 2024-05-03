import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMaterialesComponent } from './ver-materiales.component';

describe('VerMaterialesComponent', () => {
  let component: VerMaterialesComponent;
  let fixture: ComponentFixture<VerMaterialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMaterialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
