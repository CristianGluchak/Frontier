import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  mostrarToolBar: boolean = true;

  constructor(private router: Router, private authService: AuthService) {}

  goToEmpresa() {
    this.router.navigate(['/empresa']);
  }

  goToCadastroPessoa() {
    this.router.navigate(['/pessoa']);
  }

  goToCadastroFuncionario() {
    this.router.navigate(['/funcionario']);
  }

  goToCalcularFolha() {
    this.router.navigate(['/calcula-folha']);
  }

  goqToHistoricoFolha() {
    this.router.navigate(['/historico-folha']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
