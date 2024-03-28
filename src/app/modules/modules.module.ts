import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalculaFolhaComponent } from './calcula-folha/calcula-folha.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    EmpresaComponent,
    FuncionarioComponent,
    CalculaFolhaComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModulesModule { }
