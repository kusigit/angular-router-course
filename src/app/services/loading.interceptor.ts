import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
} from "@angular/common/http";

import { LoadingService } from "../shared/loading/loading.service";
import { inject } from "@angular/core";

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loadingService = inject(LoadingService);
  loadingService.loadingOn();
  return next(req);
};
