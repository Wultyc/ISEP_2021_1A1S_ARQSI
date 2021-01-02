import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router'
import { NodesComponent } from './RedeMasterData/components/nodes/nodes.component'
import { LineComponent } from './RedeMasterData/components/line/line.component';
import { TripulantTypeComponent } from './RedeMasterData/components/tripulant-type/tripulant-type.component';
import { VehicleTypeComponent } from './RedeMasterData/components/vehicle-type/vehicle-type.component';
import { ImportGLXComponent } from './RedeMasterData/components/import-glx/import-glx.component';
import { RoutesComponent } from './RedeMasterData/components/routes/routes.component';
import { LineRouteComponent } from './RedeMasterData/components/line-route/line-route.component';
import { VehiclesComponent } from './ViagemMasterData/components/vehicles/vehicles.component';
import { TripsComponent } from './ViagemMasterData/components/trips/trips.component'
import { TripulantComponent } from './ViagemMasterData/components/tripulant/tripulant.component';
import { VehicleServiceComponent } from './ViagemMasterData/components/vehicle-service/vehicle-service.component';
const routes: Routes = [
  {path: 'rmd/nodes', component: NodesComponent },
  {path: 'rmd/lines', component: LineComponent },
  {path: 'rmd/lines/:id/edit', component: LineRouteComponent },
  {path: 'rmd/tripulant-types', component: TripulantTypeComponent },
  {path: 'rmd/vehicle-types', component: VehicleTypeComponent },
  {path: 'rmd/routes', component: RoutesComponent },

  {path: 'vmd/vehicles', component: VehiclesComponent },
  {path: 'vmd/vehicle-service', component: VehicleServiceComponent },

  {path: 'vmd/tripulants', component: TripulantComponent },

  {path: 'vmd/trips', component: TripsComponent},
  
  {path: 'import-glx', component: ImportGLXComponent }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)

  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
