import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component'
import { mainRatingComponent } from './components/Rating/Rating-main.component';
import { RatingoptionsComponent } from './components/Rating/Rating-options.component';
import { RatingService } from './components/Rating/rating.service';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        mainRatingComponent,
        RatingoptionsComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule
    ],
    providers: [
        RatingService
    ]
})
export class AppModule {
}
