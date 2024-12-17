import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ROUTE_STATE_NAME } from '../shared/consts/store-name.const';
import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router-custom-serializer';

export const routerStateSelector =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>(ROUTE_STATE_NAME);

export const getCurrentRoute = createSelector(routerStateSelector, (router) => {
  return router.state;
});
