import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  constructor(
    private router : Router
   ){

  }

  funcionarios  = [
    {'id':1 , 'nome':'1Cristian', 'cpf':'99999999999', 'cargo':'motorista', 'horasSemanais':'40', 'salario':'1500', 'isEnable' : 'sim(1)/nao(0)'},
    {'id':2 , 'nome':'2Cristian', 'cpf':'99999999999', 'cargo':'motorista', 'horasSemanais':'40', 'salario':'1500', 'isEnable' : 'sim(1)/nao(0)'},
    {'id':3 , 'nome':'3Cristian', 'cpf':'99999999999', 'cargo':'motorista', 'horasSemanais':'40', 'salario':'1500', 'isEnable' : 'sim(1)/nao(0)'},
    {'id':4 , 'nome':'4Cristian', 'cpf':'99999999999', 'cargo':'motorista', 'horasSemanais':'40', 'salario':'1500', 'isEnable' : 'sim(1)/nao(0)'},
   ];

  ngOnInit() {
    this.funcionarios;
  }

  goToDetalhes(id: number){
    this.router.navigate(["funcionario/",id])
  }
  goToNew(){
    this.router.navigate(["funcionario/new"])
  }
}
