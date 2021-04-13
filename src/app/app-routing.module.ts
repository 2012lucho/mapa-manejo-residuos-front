import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { DashboardComponent }      from './pages/dashboard/dashboard.component';
import { MonitoreoComponent }      from './pages/monitoreo/monitoreo.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { LoginComponent }          from './pages/login/login.component';

import { AuthenticationGuard  } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'login',          component: LoginComponent },
  { path: '',               component: DashboardComponent,      canActivate: [AuthenticationGuard] },
  { path: 'monitoreo',      component: MonitoreoComponent,      canActivate: [AuthenticationGuard] },
  { path: 'administracion', component: AdministracionComponent, canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
