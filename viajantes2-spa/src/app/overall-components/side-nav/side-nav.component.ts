import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute} from '@angular/router';
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

  constructor(private route: ActivatedRoute,
    private router: Router , private breakpointObserver: BreakpointObserver) {}
  
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
}

