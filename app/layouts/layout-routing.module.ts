import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PaginaPrincipalComponent} from './pagina-principal/pagina-principal';
import {RegistroConfirmadoComponent} from './registro-confirmado/registro-confirmado.component';
import {VerMaterialesComponent} from "./ver-materiales/ver-materiales.component";

const routes: Routes = [
    {
        path: '',
        component: PaginaPrincipalComponent
    },
    {
        path: 'empresas',
        component: RegistroConfirmadoComponent
    },
    {
        path: 'materiales',
        component: VerMaterialesComponent
    },
    {
        path: '**',
        component: PaginaPrincipalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutsRoutingModule {
}
