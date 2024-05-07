import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = new LoadingService();
  loadingService.showLoading();
  return next(req).pipe(
    finalize(() => {
      loadingService.hideLoading();
    })
  );
};
