import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ModulesModule } from './modules/modules.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { ValidarCpfService } from './modules/services/validar-cpf.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    ModulesModule,
    AuthModule,
  ],
  providers: [
    AuthService, ValidarCpfService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
