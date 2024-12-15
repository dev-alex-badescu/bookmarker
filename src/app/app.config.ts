import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './services/data/data.service';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './state/router/router-custom-serializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom([HttpClientInMemoryWebApiModule.forRoot(DataService)]),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore({ serializer: CustomRouterStateSerializer }),
    provideStoreDevtools({
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
  ],
};
