import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  constructor( ){

  }

  funcionarios  = [
    {'id':1 , 'nome':'1Cristian'},
    {'id':2 , 'nome':'2Cristian'},
    {'id':3 , 'nome':'3Cristian'},
    {'id':4 , 'nome':'4Cristian'},
   ];

  ngOnInit() {
    this.funcionarios;
    console.log(this.funcionarios)
  }
}
