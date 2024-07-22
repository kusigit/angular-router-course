import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err) {
        switch (err.status) {
          case 400:
            break;
          case 401:
            break;
          default:
            console.log("error handler", err.statusText);
            break;
        }
      }

      throw err;
    })
  );
};
