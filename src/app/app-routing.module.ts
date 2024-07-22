import { inject, NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadAllModules,
  UrlSerializer,
  NoPreloading,
  provideRouter,
  withViewTransitions,
} from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanLoadAuthGuard } from "./services/can-load-auth.guard";
import { CustomPreloadingStrategy } from "./services/custom-preloading.strategy";
import { ChatComponent } from "./chat/chat.component";
// import { HobbiesStore } from "./services/hobbies.store";
import { coursesResolver } from "./courses/services/courses.resolver";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/courses",
    pathMatch: "full",
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
    // canLoad: [CanLoadAuthGuard]
    // data: {
    //   preload: false,
    // },
    //resolve: {
    //  courses: coursesResolver,
    //      courses: () => inject(HobbiesStore).load(),
    //},
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "helpdesk-chat",
    component: ChatComponent,
    outlet: "chat",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  // imports: [
  //   RouterModule.forRoot(routes, {
  //     preloadingStrategy: CustomPreloadingStrategy,
  //     scrollPositionRestoration: "enabled",
  //     paramsInheritanceStrategy: "always",
  //   }),
  // ],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withViewTransitions()),
    CanLoadAuthGuard,
    //  CustomPreloadingStrategy,
  ],
})
export class AppRoutingModule {}
