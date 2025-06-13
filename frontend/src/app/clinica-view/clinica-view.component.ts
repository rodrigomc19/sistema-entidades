import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ClinicaService } from '../clinica.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinica-view',
  templateUrl: './clinica-view.component.html',
  styleUrls: ['./clinica-view.component.scss']
})
export class ClinicaViewComponent implements OnInit {
  // Recebe o ID da clínica para carregar os dados
  @Input() clinicaId!: string;

  // Emite evento para fechar o modal ou card (útil para controle externo)
  @Output() closed = new EventEmitter<void>();

  // Objeto com os dados da clínica carregados da API
  clinica: {
    id: string;
    nome_fantasia: string;
    razao_social: string;
    cnpj: string;
    regional: { nome: string };
    data_inauguracao: string;
    ativa: boolean;
    especialidades: { nome: string }[];
  } | null = null;

  // Controla visibilidade do bloco completo (caso precise expandir algo)
  showAll = false;

  // Controla visualização de todas as especialidades ou só as 5 primeiras
  showAllEspecialidades = false;

  // Controla o estado de carregamento da tela
  isLoading = true;

  constructor(
    private clinicaService: ClinicaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Se recebeu um ID válido, busca os dados da clínica
    if (this.clinicaId) {
      this.isLoading = true;

      this.clinicaService.getClinica(this.clinicaId).subscribe(data => {
        // Preenche os dados da clínica, com fallback para campos que podem vir nulos
        this.clinica = {
          ...data,
          regional: data.regional || { nome: '' },
          especialidades: data.especialidades || []
        };
        this.isLoading = false;
      });
    }
  }

  // Alterna visualização de seções colapsadas (não está sendo usado aqui, mas fica pronto)
  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }

  // Fecha a visualização atual, limpa query string e emite evento externo
  close(): void {
    this.closed.emit();

    // Remove o parâmetro `visualizar` da rota atual, mantendo os demais
    this.router.navigate([], {
      queryParams: { visualizar: null },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  // Alterna entre mostrar só 5 especialidades ou todas
  toggleEspecialidades(): void {
    this.showAllEspecialidades = !this.showAllEspecialidades;
  }

  // Getter que retorna as especialidades visíveis com base no estado de expansão
  get visibleEspecialidades() {
    if (!this.clinica) return [];
    return this.showAllEspecialidades
      ? this.clinica.especialidades
      : this.clinica.especialidades.slice(0, 5);
  }

  // Getter para total de especialidades, útil para contadores ou badge "+N"
  get totalEspecialidades(): number {
    return this.clinica?.especialidades.length || 0;
  }
}
