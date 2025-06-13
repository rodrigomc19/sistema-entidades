import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importação dos componentes usados nas rotas
import { LoginComponent } from './login/login.component';
import { ClinicaFormComponent } from './clinica-form/clinica-form.component';
import { ClinicasComponent } from './clinicas/clinicas.component';
import { ClinicaViewComponent } from './clinica-view/clinica-view.component';

// Definição das rotas da aplicação
const routes: Routes = [
  // Tela de login (rota inicial padrão)
  { path: 'login', component: LoginComponent },

  // Lista de entidades (clínicas)
  { path: 'clinicas', component: ClinicasComponent },

  // Tela de formulário para editar uma clínica específica (rota legacy ou fallback)
  { path: 'clinicas/:id', component: ClinicaFormComponent },

  // Tela de criação de nova clínica
  { path: 'clinicas/nova', component: ClinicaFormComponent },

  // Rota clara para edição (mais semântica que /:id)
  { path: 'clinicas/editar/:id', component: ClinicaFormComponent },

  // Redirecionamento padrão para login caso acesse a raiz da aplicação
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rota de visualização foi comentada pois a visualização está via modal
  // { path: 'clinicas/visualizar/:id', component: ClinicaViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Aplica as rotas no app
  exports: [RouterModule]
})
export class AppRoutingModule {}
