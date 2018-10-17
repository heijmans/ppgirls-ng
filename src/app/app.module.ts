import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowComponent } from './show/show.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ShowTitlePipe } from './pipes/show-title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    ShowListComponent,
    ShowComponent,
    ShowTitlePipe,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
