import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';

import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {CountToModule} from 'angular-count-to';

import {LayoutsRoutingModule} from './layout-routing.module';

import {PaginaPrincipalComponent} from './pagina-principal/pagina-principal';
import { RegistroConfirmadoComponent } from './registro-confirmado/registro-confirmado.component';
import { ProveedorRegistradoComponent } from './proveedor-registrado/proveedor-registrado.component';
import { RegistroDeProveedorComponent } from './registro-de-proveedor/registro-de-proveedor.component';
import {NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import { VerMaterialesComponent } from './ver-materiales/ver-materiales.component';
import { EdicionDeProveedorComponent } from './edicion-de-proveedor/edicion-de-proveedor.component';
import { VerMaterialesDetalleComponent } from './ver-materiales-detalle/ver-materiales-detalle.component';

@NgModule({
  declarations: [
    PaginaPrincipalComponent,
    RegistroConfirmadoComponent,
    ProveedorRegistradoComponent,
    RegistroDeProveedorComponent,
    VerMaterialesComponent,
    EdicionDeProveedorComponent,
    VerMaterialesDetalleComponent,
  ],
    imports: [
        CommonModule,
        LayoutsRoutingModule,
        SharedModule,
        ScrollToModule.forRoot(),
        CarouselModule,
        CountToModule,
        NgbAlertModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class LayoutsModule {
}
