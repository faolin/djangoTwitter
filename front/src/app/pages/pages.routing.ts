import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'annotateTweets', pathMatch: 'full' },
            { path: 'annotateTweets', loadChildren: 'app/pages/annotate-tweets/annotate-tweets.module#AnnotateTweetModule',
             data: { breadcrumb: 'Annotate your tweets' }  },
             { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule',
             data: { breadcrumb: 'See your model' }  },

        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
