import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableDetailComponent } from './tablesComponents/table-detail/table-detail.component';
import { TableListComponent } from './tablesComponents/table-list/table-list.component';
import { FileListComponent } from './tablesComponents/file-list/file-list.component';
import { appReducer } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects';
import { HttpClientModule } from '@angular/common/http';
import { AppHeader } from './app-header/app-header.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    TableDetailComponent,
    TableListComponent,
    FileListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ appState: appReducer }),
    EffectsModule.forRoot([AppEffects]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
