import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { DashboardComponent }      from './pages/dashboard/dashboard.component';
import { MonitoreoComponent }      from './pages/monitoreo/monitoreo.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';

import { AuthenticationGuard  } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '',               component: DashboardComponent },
  { path: 'dashboard',      component: DashboardComponent },
  { path: 'monitoreo',      component: MonitoreoComponent },
  { path: 'administracion', component: AdministracionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
