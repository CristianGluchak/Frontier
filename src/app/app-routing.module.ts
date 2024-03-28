import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './modules/empresa/empresa.component';
import { FuncionarioComponent } from './modules/funcionario/funcionario.component';
import { CalculaFolhaComponent } from './modules/calcula-folha/calcula-folha.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home',component:HomeComponent},
  { path: 'empresa', component: EmpresaComponent },
  { path: 'funcionario', component: FuncionarioComponent },
  { path: 'calcula-folha', component: CalculaFolhaComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
