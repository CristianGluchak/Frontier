import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {
 
 funcionario =  {'id':1 , 'nome':'1Cristian', 'cpf':'99999999999', 'cargo':'motorista', 'horasSemanais':'40', 'salario':'1500', 'isEnable' : 'sim(1)/nao(0)'};

 ngOnInit(){
 this.funcionario;
  }



  
}
