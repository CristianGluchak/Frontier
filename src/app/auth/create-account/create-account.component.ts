import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      user: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      }),
      employer: this.fb.group({
        razaoSocial: ['', [Validators.required, Validators.minLength(3)]],
        nomeFantasia: ['', [Validators.required, Validators.minLength(3)]],
        cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
        email: ['', [Validators.required, Validators.email]],
      }),
    });
  }

  get userGroup() {
    return this.form.get('user') as FormGroup;
  }

  get employerGroup() {
    return this.form.get('employer') as FormGroup;
  }

  createAccount() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const requestData = {
      user: this.userGroup.value,
      employer: this.employerGroup.value,
    };

    this.authService.createAccount(requestData).subscribe({
      next: () => {
        const u = requestData.user;
        this.authService.login(u.email, u.password).subscribe({
          next: () => this.router.navigate(['/home']),
        });
      },
      error: () => {
        alert('Erro ao criar conta. Tente novamente.');
        this.isLoading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
