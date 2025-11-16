import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginUser } from './usuario';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public usuario: LoginUser = new LoginUser();

  constructor(
    private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {}

  login() {
    this.authService
      .login(this.usuario.email, this.usuario.password)
      .subscribe({
        next: () => {
          this.snack.open('Login realizado com sucesso!', '', {
            duration: 2000,
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          const msg =
            err?.error?.message || 'Erro ao realizar login. Tente novamente.';

          this.snack.open(msg, 'Fechar', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        },
      });
  }

  goToCreateAccount() {
    this.router.navigate(['/create-account']);
  }
}
