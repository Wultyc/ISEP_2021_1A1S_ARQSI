import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  isShowing = false;

  isRMDExpanded = true;
  showRMDSubmenu: boolean = false;
  showRMDSubSubMenu: boolean = false;

  isVMDExpanded = true;
  showVMDSubmenu: boolean = false;
  showVMDSubSubMenu: boolean = false;

  isGLXExpanded = true;
  showGLXSubmenu: boolean = false;
  showGLXSubSubMenu: boolean = false;

  updateGlobalExpand(){
    this.isExpanded = !this.isExpanded
    this.isRMDExpanded = this.isExpanded
    this.isVMDExpanded = this.isExpanded
    this.isGLXExpanded = this.isExpanded
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  constructor(private route: ActivatedRoute,
    private router: Router, private breakpointObserver: BreakpointObserver) { }

  goToNodes(): void {
    this.router.navigate(['nodes'], { relativeTo: this.route });
  }
  goToLines(): void {
    this.router.navigate(['lines'], { relativeTo: this.route });
  }
  goToVType(): void {
    this.router.navigate(['vehicle-types'], { relativeTo: this.route });
  }
  goToTType(): void {
    this.router.navigate(['tripulant-types'], { relativeTo: this.route });
  }
  goToTGLX(): void {
    this.router.navigate(['import-glx'], { relativeTo: this.route });
  }
  goToRoutes(): void {
    this.router.navigate(['routes'], { relativeTo: this.route });
  }
  goToVehicles(): void {
    this.router.navigate(['vehicles'], { relativeTo: this.route });
  }
}

