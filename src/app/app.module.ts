import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsMenuComponent } from './components/tabs-menu/tabs-menu.component';
import { HeaderComponent } from './components/header/header.component';
import { LogotipoComponent } from './components/logotipo/logotipo.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MapPointsComponent } from './components/map-points/map-points.component';
import { GrillaContenedoresComponent } from './components/grilla-contenedores/grilla-contenedores.component';
import { DashboardFinderComponent } from './components/dashboard-finder/dashboard-finder.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { LoginComponent } from './pages/login/login.component';
import { TableComponentComponent } from './components/table-component/table-component.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsMenuComponent,
    HeaderComponent,
    LogotipoComponent,
    DashboardComponent,
    MapPointsComponent,
    GrillaContenedoresComponent,
    DashboardFinderComponent,
    MonitoreoComponent,
    AdministracionComponent,
    LoginComponent,
    TableComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
