import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
  funcionarioForm!: FormGroup ;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const funcionario = {'id':1 , 'nome':'1Cristian', 'cpf':'99999999999', 'cargo':'motorista', 'horasSemanais':'40', 'salario':'1500', 'isEnable' : 'sim(1)/nao(0)'};

    this.funcionarioForm = this.formBuilder.group({
      nome: [funcionario.nome],
      cpf: [funcionario.cpf],
      cargo: [funcionario.cargo],
      horasSemanais: [funcionario.horasSemanais],
      salario: [funcionario.salario],
      isEnable: [funcionario.isEnable === 'sim(1)/nao(0)' ? true : false]
    });
  }
}
