import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as actions from './actions';
import { HttpClient } from '@angular/common/http';
import { Table, TableTitleAndIndex } from './state';
import { TableEndpointParams } from './entrypointsParams.type';


@Injectable()
export class AppEffects {
  basurl = 'http://localhost:3000/api';

  enpoints = {
    FILES: `${this.basurl}/files`,
    TABLES: (filename: string) => `${this.basurl}/files/${filename}/tables`,
    TABLE: ({ fileName, tableIndex }: TableEndpointParams) => `${this.basurl}/files/${fileName}/tables/${tableIndex}`   
  }

  loadFiles$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadFiles),
    mergeMap(() => this.http.get<string[]>(this.enpoints.FILES)
      .pipe(
        map(files => actions.filesLoaded({ files })),
        catchError(() => EMPTY)
      ))
  )
  );

  loadTables$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTables),
    mergeMap(({ fileName }) => this.http.get<TableTitleAndIndex[]>(this.enpoints.TABLES(fileName))
      .pipe(
        map(tables => actions.tablesLoaded({ tables })),
        catchError(() => EMPTY)
      ))
  )
  
  
  );

  loadTable$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadTable),
    mergeMap(({ params }) => {
      console.log(this.enpoints.TABLE(params))
      return this.http.get<Table>(this.enpoints.TABLE(params))
      .pipe(
        map(table => actions.tableLoaded({ table })),
        catchError(() => EMPTY)
      )})
  ));
 
  constructor(private actions$: Actions, private http: HttpClient) {  }
}
