import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent {
  isLoading = false;

  user = {
    name: '',
    email: '',
    password: '',
  };

  employer = {
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    email: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  createAccount() {
    if (this.validateForm()) {
      this.isLoading = true;

      const requestData = {
        user: { ...this.user },
        employer: { ...this.employer },
      };

      this.authService.createAccount(requestData).subscribe({
        next: (response) => {
          this.authService
            .login(requestData.user.email, requestData.user.password)
            .subscribe({
              next: () => this.router.navigate(['/home']),
            });
        },
        error: (error) => {
          alert('Erro ao criar conta. Tente novamente.');
          this.isLoading = false;
        },
      });
    }
  }

  validateForm(): boolean {
    if (!this.user.name || !this.user.email || !this.user.password) {
      alert('Preencha todos os campos do usuário');
      return false;
    }

    if (
      !this.employer.razaoSocial ||
      !this.employer.nomeFantasia ||
      !this.employer.cnpj ||
      !this.employer.email
    ) {
      alert('Preencha todos os campos da empresa');
      return false;
    }

    return true;
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
