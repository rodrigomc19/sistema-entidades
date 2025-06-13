import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Serviço responsável por se comunicar com a API de clínicas
@Injectable({
  providedIn: 'root' // disponível globalmente sem precisar registrar no módulo
})
export class ClinicaService {
  // URL base para as requisições relacionadas à clínica
  private apiUrl = 'http://localhost:8000/api/clinics';

  constructor(private http: HttpClient) {}

  /**
   * Lista clínicas com paginação e busca.
   * @param search Texto buscado (nome, especialidade, etc)
   * @param page Página atual
   * @param perPage Quantidade por página
   */
  getClinicas(search = '', page = 1, perPage = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(this.apiUrl, { params });
  }

  /**
   * Lista todas as regionais disponíveis (para popular o select no formulário).
   */
  getRegionais(): Observable<any> {
    return this.http.get('http://localhost:8000/api/regionais');
  }

  /**
   * Lista todas as especialidades disponíveis.
   */
  getEspecialidades(): Observable<any> {
    return this.http.get('http://localhost:8000/api/especialidades');
  }

  /**
   * Cadastra uma nova clínica no sistema.
   * @param data Dados da nova clínica (enviados via body)
   */
  createClinica(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  /**
   * Busca os dados de uma clínica específica pelo ID.
   * @param id ID da clínica a ser buscada
   */
  getClinica(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /**
   * Atualiza os dados de uma clínica já existente.
   * @param id ID da clínica
   * @param data Dados atualizados enviados no body
   */
  updateClinica(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Exclui uma clínica pelo ID.
   * @param id ID da clínica a ser excluída
   */
  deleteClinica(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
