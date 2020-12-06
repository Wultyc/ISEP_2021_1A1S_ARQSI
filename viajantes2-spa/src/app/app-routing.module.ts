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
const routes: Routes = [
  {path: 'nodes', component: NodesComponent },
  {path: 'lines', component: LineComponent },
  {path: 'tripulant-types', component: TripulantTypeComponent },
  {path: 'vehicle-types', component: VehicleTypeComponent },
  {path: 'routes', component: RoutesComponent },
  {path: 'import-glx', component: ImportGLXComponent },
  { path: 'routes/edit/:id', component: LineRouteComponent },
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
