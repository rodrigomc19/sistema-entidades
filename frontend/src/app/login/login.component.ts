import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Formulário reativo para login
  loginForm: FormGroup;

  // Alterna a visibilidade da senha
  showPassword: boolean = false;

  // Mensagem de erro a ser exibida na interface
  loginError: string = '';

  // Indica sucesso no login
  loginSuccess: boolean = false;

  // Indica se a requisição de login está em andamento (usado para loading)
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Inicializa o formulário com validações
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Executado ao submeter o formulário de login
  onSubmit(): void {
    // Limpa estados anteriores
    this.loginError = '';
    this.loginSuccess = false;
    this.isLoading = true;

    // Verifica se o formulário está inválido antes de enviar
    if (this.loginForm.invalid) {
      this.loginError = 'Preencha todos os campos corretamente.';
      this.isLoading = false;
      return;
    }

    // Coleta as credenciais do formulário
    const credentials = this.loginForm.value;

    // Chama o serviço de login e trata as respostas
    this.authService.login(credentials).subscribe({
      next: (response) => {
        // Armazena o token de autenticação no localStorage
        localStorage.setItem('token', response.token);
        this.loginSuccess = true;

        // Aguarda 1.5 segundos e redireciona para a tela principal
        setTimeout(() => {
          this.router.navigate(['/clinicas']);
        }, 1500);
      },
      error: () => {
        // Exibe erro amigável caso a autenticação falhe
        this.loginError = 'E-mail ou senha inválidos. Tente novamente.';
        this.isLoading = false;
      },
      complete: () => {
        // Finaliza o carregamento, independente do resultado
        this.isLoading = false;
      }
    });
  }

  // Alterna entre mostrar e ocultar a senha
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
