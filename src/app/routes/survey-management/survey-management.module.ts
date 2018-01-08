import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@shared/shared.module';
import { RecordResolverGuard } from '@core/services/edit.guard.service';

import { InputcmpComponent } from './shared/inputcmp/inputcmp.component';
import { RadiocmpComponent } from './shared/radiocmp/radiocmp.component';
import { IdccmpComponent} from './shared/idccmp/idccmp.component';
import { PhoneComponent} from './shared/phonecmp/phonecmp.component';
import { CheckboxcmpComponent } from './shared/checkboxcmp/checkboxcmp.component';
import { SurveyOverviewComponent } from './survey-overview/survey-overview.component';
import { Table35Component } from './shared/tablecmp/table35/table35.component';
import { Table46Component } from './shared/tablecmp/table46/table46.component';
import { SingletableComponent} from './shared/tablecmp/singleTable/singletable.component';
import { DatecmpComponent } from './shared/datecmp/datecmp.component';

import { Infor1Component } from './info1/info1.cpomponent';
import { Info0Component } from './info0/info0.component';
import { Info2Component } from './info2/info2.component';
import { Info3Component } from './info3/info3.cpomponent';
import { Info4Component } from './info4/info4.cpomponent';

const routes: Routes = [
    { path: 'detail', component: SurveyOverviewComponent  },
    { path: 'info0', component: Info0Component  },
    { path: 'first_step', component: Infor1Component },
    { path: 'info2', component: Info2Component  },
    { path: 'info3', component: Info3Component },
    { path: 'info4', component: Info4Component }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        InputcmpComponent,
        RadiocmpComponent,
        PhoneComponent,
        IdccmpComponent,
        CheckboxcmpComponent,
        SurveyOverviewComponent,
        Table35Component,
        Table46Component,
        DatecmpComponent,
        SingletableComponent,
        Infor1Component,
        Info0Component,
        Info2Component,
        Info3Component,
        Info4Component
    ],
    providers: [
        RecordResolverGuard
    ]
})
export class SurveyManagementModule { }
