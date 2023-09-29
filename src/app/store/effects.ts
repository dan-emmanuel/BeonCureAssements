import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as MyActions from './actions';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppEffects {

  loadFiles$ = createEffect(() => this.actions$.pipe(
    ofType(MyActions.loadFiles),
    mergeMap(() => this.http.get<string[]>('http://localhost:3000/api/files')
      .pipe(
        map(files => MyActions.filesLoaded({ files })),
        catchError(() => EMPTY)
      ))
  )
  );

  constructor(private actions$: Actions, private http: HttpClient) {  }
}
