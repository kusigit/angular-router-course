import { Component, computed, inject, Signal } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  private readonly route = inject(ActivatedRoute);
  // private courses: Signal<Course[]>;
  // private readonly courses = signal<Course[]>([]);

  advancedCourses: Signal<Course[]>;
  beginnerCourses: Signal<Course[]>;

  constructor() {
    const courses = this.route.snapshot.data["courses"];
    //    this.courses.set(this.route.snapshot.data["courses"]);
    this.beginnerCourses = this.filterByCategory(courses, "BEGINNER");
    this.advancedCourses = this.filterByCategory(courses, "ADVANCED");
  }

  filterByCategory(courses: Signal<Course[]>, category: string) {
    return computed(() =>
      courses()
        .filter((course) => course.category === category)
        .sort(sortCoursesBySeqNo)
    );
  }
}
