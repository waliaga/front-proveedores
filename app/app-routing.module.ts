import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'inicio',
      pathMatch: 'full'
    },
    {path: 'inicio', loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule)},
    {path: 'i', loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule)},
    {path: '**', loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
