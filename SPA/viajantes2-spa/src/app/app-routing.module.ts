import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router'
import { NodesComponent } from './RedeMasterData/components/nodes/nodes.component'
import { LineComponent } from './RedeMasterData/components/line/line.component';
import { TripulantTypeComponent } from './RedeMasterData/components/tripulant-type/tripulant-type.component';
import { VehicleTypeComponent } from './RedeMasterData/components/vehicle-type/vehicle-type.component';
const routes: Routes = [
  {path: 'nodes', component: NodesComponent },
  {path: 'lines', component: LineComponent },
  {path: 'tripulant-types', component: TripulantTypeComponent },
  {path: 'vehicle-types', component: VehicleTypeComponent }
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
