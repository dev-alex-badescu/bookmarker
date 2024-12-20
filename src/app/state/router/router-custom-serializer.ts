import {
  ActivatedRouteSnapshot,
  Data,
  Params,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data: Data;
}

export class CustomRouterStateSerializer
  implements RouterStateSerializer<RouterStateUrl>
{
  serialize = (state: RouterStateSnapshot): RouterStateUrl => ({
    url: state.url,
    params: mergeRouteParams(state.root, ({ params }) => params),
    queryParams: mergeRouteParams(state.root, ({ queryParams }) => queryParams),
    data: mergeRouteData(state.root),
  });
}

const mergeRouteParams = (
  route: ActivatedRouteSnapshot,
  getter: (activatedRoute: ActivatedRouteSnapshot) => Params
): Params =>
  !route
    ? {}
    : {
        ...getter(route),
        ...mergeRouteParams(
          (route.children.find(({ outlet }) => outlet === 'primary') ||
            route.firstChild) as ActivatedRouteSnapshot,
          getter
        ),
      };

const mergeRouteData = (route: ActivatedRouteSnapshot): Data =>
  !route
    ? {}
    : {
        ...route.data,
        ...mergeRouteData(
          (route.children.find(({ outlet }) => outlet === 'primary') ||
            route.firstChild) as ActivatedRouteSnapshot
        ),
      };
