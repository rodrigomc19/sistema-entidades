import { Component, OnInit } from '@angular/core';
import { ClinicaService } from '../clinica.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clinicas',
  templateUrl: './clinicas.component.html',
  styleUrls: ['./clinicas.component.scss']
})
export class ClinicasComponent implements OnInit {
  clinicas: any[] = []; // Lista de clínicas exibidas na tabela
  searchControl = new FormControl(''); // Campo de busca com reatividade
  page = 1; // Página atual da paginação
  perPage = 10; // Quantidade por página
  totalPages = 1; // Total de páginas (recebido da API)
  selectedClinicaId: string | null = null; // ID da clínica que está sendo visualizada no modal

  constructor(
    private clinicaService: ClinicaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Carrega a lista inicial
    this.loadClinicas();

    // Debounce para evitar chamadas excessivas ao digitar na busca
    this.searchControl.valueChanges
      .pipe(debounceTime(400))
      .subscribe(() => this.loadClinicas());

    // Detecta o parâmetro de query "visualizar" e abre a visualização direto
    this.route.queryParams.subscribe(params => {
      const visualizarId = params['visualizar'];
      if (visualizarId) {
        this.openVisualizar(visualizarId);
      }
    });
  }

  // Carrega a lista de clínicas com filtros e paginação
  loadClinicas() {
    const search = this.searchControl.value || '';

    this.clinicaService.getClinicas(search, this.page, this.perPage).subscribe(res => {
      this.clinicas = res.data;
      this.totalPages = res.last_page;
    });
  }

  // Vai para a próxima página, se existir
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadClinicas();
    }
  }

  // Volta uma página, se não estiver na primeira
  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadClinicas();
    }
  }

  // Abre a visualização da clínica (via modal)
  openVisualizar(id: string) {
    this.selectedClinicaId = id;
  }

  // Fecha o modal de visualização
  closeVisualizar() {
    this.selectedClinicaId = null;
  }

  // Limpa o campo de busca e atualiza a listagem
  clearSearch() {
    this.searchControl.setValue('');
  }
}
