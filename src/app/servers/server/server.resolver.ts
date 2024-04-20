import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

export const serverResolver: ResolveFn<Server> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const serversService = inject(ServersService);

  return serversService.getServer(+route.params['id']);
};

/**
 * Zamiast używać servisu do wczytania danych, które by się wczytywały, że najpierw komponent później dane,
 * można wykorzystać resolver aby najepierw wczytać dane (preFEtching), a później komponent
 */
