import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './app/+store';
import { isDevMode } from '@angular/core';


bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
        ...appConfig.providers,
        provideStore(reducers),
        provideEffects([]),
        provideStoreDevtools({ maxAge: 25 , logOnly: !isDevMode()})
    ]
}).catch(err => console.error(err));
