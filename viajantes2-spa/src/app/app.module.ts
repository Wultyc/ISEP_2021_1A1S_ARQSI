import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule} from '@angular/material/sidenav';
import { AppComponent } from './app.component';
import { NodesComponent } from './RedeMasterData/components/nodes/nodes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LineComponent } from './RedeMasterData/components/line/line.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './overall-components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule} from '@angular/material/table';
import { SideNavComponent } from './overall-components/side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { VehicleTypeComponent } from './RedeMasterData/components/vehicle-type/vehicle-type.component';
import { TripulantTypeComponent } from './RedeMasterData/components/tripulant-type/tripulant-type.component';
import { MatSelectModule } from '@angular/material/select';
import { ImportGLXComponent } from './RedeMasterData/components/import-glx/import-glx.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RoutesComponent } from './RedeMasterData/components/routes/routes.component';
import { CommonModule } from '@angular/common';
 

@NgModule({
  declarations: [
    AppComponent,
    NodesComponent,
    LineComponent,
    FooterComponent,
    SideNavComponent,
    VehicleTypeComponent,
    TripulantTypeComponent,
    ImportGLXComponent,
    RoutesComponent,
    
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSortModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    CommonModule

    ],
  exports: [
    // MatButtonModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatSortModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatCheckboxModule,
    // MatSelectModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
