import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from './login/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioAutenticado: boolean = false;

  mostrarToolBarEmitter = new EventEmitter<boolean>();

  usuarioDados: any;

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.usuarioDados = user;
        localStorage.setItem('user', JSON.stringify(this.usuarioDados));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  fazerLogin(usuario: Usuario) {
    if (usuario.nome === 'test' && usuario.senha === '123') {
      this.usuarioAutenticado = true;

      this.mostrarToolBarEmitter.emit(true);

      this.router.navigate(['/home']);
    } else {
      this.usuarioAutenticado = false;
      this.mostrarToolBarEmitter.emit(false);
    }
  }

  public logar(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public registrar(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
}
