import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  mostrarToolBar : boolean = true;
  //TODO: VOLTAR PARA FALSE O MOSTRARBARRA
  constructor(
    private router : Router,
    private authService : AuthService
  ){

  }

  ngOnInit(){
      this.authService.mostrarToolBarEmitter.subscribe(
        mostrar =>this.mostrarToolBar = mostrar
      );
  }

  goToEmpresa() {
    this.router.navigate(['/empresa'])
    return console.log("caminho para editar empresa logada");
  }

  goToCadastroPessoa() {
    this.router.navigate(['/pessoa'])
    return console.log("caminho para cadastrar pessoa");
  }

  goToCadastroFuncionario() {
    this.router.navigate(['/funcionario'])
    return console.log("caminho para cadastrar funcionario");
  }

  goToCalcularFolha() {
    this.router.navigate(['/calcula-folha'])
    return console.log("caminho para calcular folha");
  }

}
