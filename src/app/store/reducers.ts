import { createReducer, on } from '@ngrx/store';
import * as actions from './actions';
import { AppState } from './state';

export const initialState: AppState = {
  files: [],
  tables: []
};

export const appReducer = createReducer(
  initialState,
  on(actions.filesLoaded, (state, { files }) => ({ ...state, files })),
  on(actions.tablesLoaded, (state, { tables }) => ({ ...state, tables }))
);