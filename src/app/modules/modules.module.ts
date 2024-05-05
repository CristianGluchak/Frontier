import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalculaFolhaComponent } from './calcula-folha/calcula-folha.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { HomeComponent } from './home/home.component';
import { DetalhesComponent } from './funcionario/detalhes/detalhes.component';
import { NewComponent } from './funcionario/new/new.component';



@NgModule({
  declarations: [
    EmpresaComponent,
    FuncionarioComponent,
    CalculaFolhaComponent,
    HomeComponent,
    DetalhesComponent,
    NewComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModulesModule { }
