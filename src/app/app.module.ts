import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

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
import { LoadingComponent } from './components/loading/loading.component';
import { MessageComponent } from './components/message/message.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { MonitoreoComponent } from './pages/monitoreo/monitoreo.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { LoginComponent } from './pages/login/login.component';
import { TableComponentComponent } from './components/table-component/table-component.component';
import { EmpresasAbmComponent } from './pages/administracion/empresas-abm/empresas-abm.component';
import { TipoContAbmComponent } from './pages/administracion/tipo-cont-abm/tipo-cont-abm.component';
import { ReciclerBynAbmComponent } from './pages/administracion/recicler-byn-abm/recicler-byn-abm.component';
import { UbicationsAbmComponent } from './pages/administracion/ubications-abm/ubications-abm.component';
import { UbicationsFormComponent } from './pages/administracion/ubications-abm/ubications-form/ubications-form.component';
import { MapSelectPointComponent } from './components/map-select-point/map-select-point.component';
import { BootstrapFormComponent } from './components/bootstrap-form/bootstrap-form.component';
import { FillLevelComponent } from './pages/administracion/fill-level/fill-level.component';

import { AuthenticationGuard  } from './services/auth/auth.guard';
import { SensorsAbmComponent } from './pages/administracion/sensors-abm/sensors-abm.component';
import { UsersAbmComponent } from './pages/administracion/users-abm/users-abm.component';

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
    TableComponentComponent,
    EmpresasAbmComponent,
    TipoContAbmComponent,
    ReciclerBynAbmComponent,
    UbicationsAbmComponent,
    UbicationsFormComponent,
    MapSelectPointComponent,
    BootstrapFormComponent,
    LoadingComponent, MessageComponent,
    FillLevelComponent,
    SensorsAbmComponent,
    UsersAbmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GoogleMapsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgbModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
