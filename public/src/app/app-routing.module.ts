import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';




const routes: Routes = [
	{path:'home', component: HomeComponent},
  {path:'pet/edit/:id', component: EditComponent},
  {path:'pet/new', component: NewComponent},
  {path:'pet/show/:id', component: ShowComponent},  
	{path:'', pathMatch:'full', component: HomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]

})
export class AppRoutingModule { }
