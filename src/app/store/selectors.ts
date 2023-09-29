import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './state';

const selectAppState = createFeatureSelector<AppState>('appState');

export const selectFiles = createSelector(
  selectAppState,
  (state: AppState) => state.files
);

export const selectTables = createSelector(
  selectAppState,
  (state: AppState) => state.tables
);

export const selectTable = createSelector(
  selectAppState,
  (state: AppState) => state.table
);
