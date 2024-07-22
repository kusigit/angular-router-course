import { inject, Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
// import { firstValueFrom } from "rxjs";

import { CoursesService } from "./courses.service";
import { Course } from "../model/course";
import { CoursesStore } from "../../services/hobbies.store";

export const coursesResolver: ResolveFn<Course[]> = () =>
  // route: ActivatedRouteSnapshot
  {
    //   const courseUrl = route.paramMap.get("courseUrl");
    const store = inject(CoursesStore);
    return store.load();
    // return 44;
  };
