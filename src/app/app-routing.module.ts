import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './pages/lista/lista.component';
import { LoginComponent } from './pages/login/login.component';
import { PutOrPostComponent } from './components/put-or-post/put-or-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // redireciona / para /cadastro por enquanto
  { path: 'login', component: LoginComponent },
  { path: 'lista', component: ListaComponent },
  { path: 'atualizar', component: PutOrPostComponent },
  { path: 'atualizar/:id', component: PutOrPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
