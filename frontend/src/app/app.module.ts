import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Módulo de rotas principal
import { AppRoutingModule } from './app-routing.module';

// Componentes principais da aplicação
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClinicaFormComponent } from './clinica-form/clinica-form.component';
import { ClinicasComponent } from './clinicas/clinicas.component';
import { ClinicaViewComponent } from './clinica-view/clinica-view.component';

// Módulos de formulários (reativo e template-driven)
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Comunicação HTTP com a API
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptor que injeta o token de autenticação nas requisições
import { AuthInterceptor } from './auth.interceptor';

// Pipe customizado para formatar CNPJ
import { CnpjMaskPipe } from './shared/cnpj-mask.pipe';

// Módulo do ng-select para dropdowns personalizados
import { NgSelectModule } from '@ng-select/ng-select';

// Módulos do ngx-mask para máscaras de inputs
import {
  NgxMaskDirective,
  NgxMaskPipe,
  provideNgxMask
} from 'ngx-mask';

@NgModule({
  declarations: [
    // Componentes e pipes usados na aplicação
    AppComponent,
    LoginComponent,
    ClinicaFormComponent,
    ClinicasComponent,
    ClinicaViewComponent,
    CnpjMaskPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxMaskDirective,  // Diretiva para usar máscaras nos campos
    NgSelectModule     // Módulo para selects com busca e múltipla seleção
  ],
  providers: [
    // Registra o interceptor global para anexar headers de autenticação
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

    // Registra o serviço de máscaras do ngx-mask
    provideNgxMask()
  ],
  bootstrap: [AppComponent] // Componente inicial da aplicação
})
export class AppModule { }
