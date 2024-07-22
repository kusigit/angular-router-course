import { effect, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  readonly loading = signal(false);

  constructor() {
    effect(() => {
      console.log("loading", this.loading());
    });
  }

  loadingOn() {
    this.loading.set(true);
  }

  loadingOff() {
    this.loading.set(false);
  }
}
