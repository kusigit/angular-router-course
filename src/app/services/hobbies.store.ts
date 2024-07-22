import { inject } from "@angular/core";
// import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { setEntities, withEntities } from "@ngrx/signals/entities";

import { of } from "rxjs";
import { CoursesService } from "../courses/services/courses.service";
import { catchError, map } from "rxjs/operators";
import { Course } from "../courses/model/course";
import { signalStore, withMethods, patchState } from "@ngrx/signals";

export const CoursesStore = signalStore(
  { providedIn: "root" },
  //  withDevtools("hobbies"),
  withEntities<Course>(),
  withMethods((state, service = inject(CoursesService)) => ({
    load: () =>
      service.loadAllCourses().pipe(
        map((entities) => {
          patchState(state, setEntities(entities));
          return state;
        }),
        catchError((error) => of(error))
        //  catchError((error) => {
        //     console.log("1", error);
        //    return of(error);
        //  })
      ),
  }))
);
