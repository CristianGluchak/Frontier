import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public usuario: Usuario = new Usuario();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.authService
      .login(this.usuario?.email, this.usuario?.password)
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => alert('Usuário ou senha incorretos'),
      });
  }

  goToCreateAccount() {
    this.router.navigate(['/create-account']);
  }
}
