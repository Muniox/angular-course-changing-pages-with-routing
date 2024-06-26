import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuardChild } from './auth.guard';
import { canDeactivateGuard } from './servers/edit-server/can-deactivate.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { serverResolver } from './servers/server/server.resolver';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [{ path: ':id/:name', component: UserComponent }],
  },
  {
    path: 'servers',
    // canActivate: [authGuard],
    canActivateChild: [authGuardChild],
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: { server: serverResolver },
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [canDeactivateGuard],
      },
    ],
  },
  // { path: 'page-not-found', component: PageNotFoundComponent },
  {
    path: 'page-not-found',
    component: ErrorPageComponent,
    data: { message: 'Page not found!' },
  },
  { path: '**', redirectTo: '/page-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  // imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
