import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
} from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { Observable } from "rxjs";
import { CoursesService } from "../services/courses.service";
import { map } from "rxjs/operators";
import { LoadingService } from "../../shared/loading/loading.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  advancedCourses: Signal<Course[]>;
  beginnerCourses: Signal<Course[]>;
  courses: Signal<Course[]>;
  // readonly courses = signal<Course[]>([]);

  ngOnInit() {
    //    this.courses.set(this.route.snapshot.data["courses"].entities);
    this.courses = this.route.snapshot.data["courses"].entities;
    this.beginnerCourses = this.filterByCategory(this.courses, "BEGINNER");
    this.advancedCourses = this.filterByCategory(this.courses, "ADVANCED");
  }

  filterByCategory(courses: Signal<Course[]>, category: string) {
    return computed(() =>
      courses()
        .filter((course) => course.category === category)
        .sort(sortCoursesBySeqNo)
    );
  }
}
