import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculaFolhaServiceimplements implements OnInit {
  ngOnInit() {
    this.calculateNetSalary();
  }

  grossSalaryInput: number = 1412;
  dependentsInput = 0;
  deductionInput = 0;

  baseSalary!: number;
  netSalary!: number;
  inss!: number;
  irrf!: number;

  calculateNetSalary() {
    if (
      this.grossSalaryInput < 1412 ||
      this.dependentsInput < 0 ||
      this.deductionInput < 0
    ) {
      return;
    }

    this.inss = this.handleInss(this.grossSalaryInput);
    this.baseSalary = this.grossSalaryInput - this.inss;

    this.irrf = this.handleIrrf(
      this.baseSalary - this.dependentsInput * 189.59
    );

    this.netSalary =
      Math.round((this.baseSalary - this.irrf - this.deductionInput) * 100) /
      100;
  }

  private handleIrrf(salary: number) {
    return (
      Math.round(
        (salary < 1903.99
          ? 0
          : salary < 2826.65
          ? salary * 0.075 - 142.8
          : salary < 3751.05
          ? salary * 0.15 - 354.8
          : salary < 4664.68
          ? salary * 0.225 - 636.13
          : salary * 0.275 - 869.36) * 100
      ) / 100
    );
  }

  private handleInss(salary: number) {
    return (
      Math.round(
        (salary < 1412.0
          ? salary * 0.075
          : salary < 2666.68
          ? salary * 0.09
          : salary < 4000.03
          ? salary * 0.12
          : salary < 7786.02
          ? salary * 0.14
          : 908.86) * 100
      ) / 100
    );
  }
}
