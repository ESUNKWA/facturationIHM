import { LoginComponent } from './views/pages/auth/login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  //{ path:'login', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  { path:'', loadChildren: () => import('./content/homepage/homepage.module').then(m => m.HomeModue)},
  { path:'home', loadChildren: () => import('./content/homepage/homepage.module').then(m => m.HomeModue)},
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'privilege',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'utilisateurs',
        loadChildren: () => import('./content/utilisateur/utilisateur.module').then(m => m.UtilisateurModule)
      },
      {
        path: 'profils',
        loadChildren: () => import('./content/profil-utilisateurs/profilutilisateur.module').then(m => m.ProfilUtilisateursModule)
      },
      {
        path: 'partenaires',
        loadChildren: () => import('./content/partenaires/partenaires.module').then(m => m.PartenairesModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./content/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'produits',
        loadChildren: () => import('./content/produits/produits.module').then(m => m.ProduitsModule)
      },
      {
        path: 'ventes',
        loadChildren: () => import('./content/venteproduits/venteproduits.module').then(m => m.VenteproduitModule)
      },
      {
        path: 'commandes',
        loadChildren: () => import('./content/commandes/commandes.module').then(m => m.CommandesModule)
      },
      {
        path: 'details-ventes',
        loadChildren: () => import('./content/detailsventes/detailsventes.module').then(m => m.DetailsventesModule)
      },
      {
        path: 'livraisons',
        loadChildren: () => import('./content/livraison/livraison.module').then(m => m.LivraisonModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./content/clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'achat',
        loadChildren: () => import('./content/viewsachatprod/viewsachatprod.module').then(m => m.ViewsAchatsProdModule)
      },



      {
        path: 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        loadChildren: () => import('./views/pages/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'form-elements',
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'error', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page non trouvée',
      'desc': 'Oups !! La page que vous cherchiez n\'existe pas.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
