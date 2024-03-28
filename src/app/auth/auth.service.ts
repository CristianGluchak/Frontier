import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './login/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado : boolean = false;

  mostrarToolBarEmitter = new EventEmitter<boolean>();

  constructor(private router : Router) { }

  fazerLogin(usuario:Usuario){

    if(usuario.nome === 'test' && 
    usuario.senha === '123'){

      this.usuarioAutenticado = true;

      this.mostrarToolBarEmitter.emit(true);

      this.router.navigate(['/home'])
    }else{
      this.usuarioAutenticado = false;
      this.mostrarToolBarEmitter.emit(false);
    }
    
  }
}
