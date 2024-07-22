import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  provideRouter,
  withViewTransitions,
} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CourseComponent } from "./course/course.component";
import { CourseResolver } from "./services/course.resolver";
import { LessonDetailComponent } from "./lesson/lesson-detail.component";
import { LessonsListComponent } from "./lessons-list/lessons-list.component";
import { lessonsResolver } from "./services/lessons.resolver";
import { LessonDetailResolver } from "./services/lesson-detail.resolver";
import { AuthGuard } from "../services/auth.guard";
import { ConfirmExitGuard } from "../services/confirm-exit.guard";
import { coursesResolver } from "./services/courses.resolver";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    resolve: {
      courses: coursesResolver,
      //      courses: () => inject(HobbiesStore).load(),
    },
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [ConfirmExitGuard],
    children: [
      {
        path: "",
        component: LessonsListComponent,
        resolve: {
          lessons: lessonsResolver,
        },
      },
      {
        path: "lessons/:lessonSeqNo",
        component: LessonDetailComponent,
        resolve: {
          lesson: LessonDetailResolver,
        },
      },
    ],
    resolve: {
      course: CourseResolver,
    },
  },
];

@NgModule({
  // imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withViewTransitions()),
    CourseResolver,
    // LessonsResolver,
    LessonDetailResolver,
    AuthGuard,
    ConfirmExitGuard,
  ],
})
export class CoursesRoutingModule {}
