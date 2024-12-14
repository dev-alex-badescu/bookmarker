import {
  mergeApplicationConfig,
  ApplicationConfig,
  importProvidersFrom,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { DataService } from './services/data/data.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([HttpClientInMemoryWebApiModule.forRoot(DataService)]),
    HttpClient,
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
