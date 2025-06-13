import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// Serviço de autenticação centralizado, acessível via injeção de dependência
@Injectable({
  providedIn: 'root' // disponível globalmente sem precisar registrar em providers
})
export class AuthService {
  // URL base da API (ajustar conforme ambiente)
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Realiza login na API e retorna o token no response
   * @param credentials Objeto com email e senha
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }

  /**
   * Remove o token do localStorage (logout client-side)
   */
  logout() {
    localStorage.removeItem('token');
  }

  /**
   * Recupera o token JWT armazenado localmente
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Verifica se o usuário está autenticado (baseado na existência do token)
   */
  isAuthenticated(): boolean {
    return !!this.getToken(); // true se houver token
  }
}
