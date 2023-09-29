
import { createAction, props } from '@ngrx/store';
import { Table, TableTitleAndIndex } from './state';
import { TableEndpointParams } from './entrypointsParams.type';

export const loadFiles = createAction('[File] Load Files');
export const filesLoaded = createAction('[File] Files Loaded', props<{ files: string[] }>());
export const loadTables = createAction('[Table] Load Tables', props<{ fileName: string }>());
export const tablesLoaded = createAction('[Table] Tables Loaded', props<{ tables: TableTitleAndIndex[] }>());
export const loadTable = createAction('[Table] Load Tables', props<{ params: TableEndpointParams }>());
export const tableLoaded = createAction('[Table] Tables Loaded', props<{ table: Table }>());
