import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './state';

// Feature Selector
const selectAppState = createFeatureSelector<AppState>('app');

// Selectors
export const selectFiles = createSelector(
  selectAppState,
  (state: AppState) => state.files
);

export const selectTables = createSelector(
  selectAppState,
  (state: AppState) => state.tables
);


