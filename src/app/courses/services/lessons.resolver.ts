import { inject, Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";
import { LessonSummary } from "../model/lesson-summary";

import { CoursesService } from "./courses.service";

export const lessonsResolver: ResolveFn<LessonSummary[]> = (
  route: ActivatedRouteSnapshot
) => {
  const courseUrl = route.paramMap.get("courseUrl");
  return inject(CoursesService).loadAllCourseLessonsSummary(courseUrl);
};
