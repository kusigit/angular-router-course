import { Component, inject, signal } from "@angular/core";
import { MatProgressBarModule } from "@angular/material/progress-bar";

import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";

@Component({
  selector: "loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.css"],
  //standalone: true,
  // imports: [MatProgressBarModule],
})
export class LoadingComponent {
  private readonly router = inject(Router);
  readonly loading = signal(false);

  constructor() {
    this.router.events.subscribe((event) => {
      // console.log(event);

      if (event instanceof NavigationStart) {
        this.loading.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationError ||
        event instanceof NavigationCancel
      ) {
        this.loading.set(false);
      }
    });
  }
}
