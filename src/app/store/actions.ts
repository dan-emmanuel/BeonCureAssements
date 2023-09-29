
import { createAction, props } from '@ngrx/store';
import { Table } from './state';

export const loadFiles = createAction('[File] Load Files');
export const filesLoaded = createAction('[File] Files Loaded', props<{ files: string[] }>());
export const loadTables = createAction('[Table] Load Tables', props<{ fileName: string }>());
export const tablesLoaded = createAction('[Table] Tables Loaded', props<{ tables: Table[] }>());
