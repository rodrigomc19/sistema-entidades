// Importações principais do Angular e serviços do projeto
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ClinicaService } from '../clinica.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

// Lib externa para usar os modais do Bootstrap (via JS)
declare var bootstrap: any;

@Component({
  selector: 'app-clinica-form',
  templateUrl: './clinica-form.component.html',
  styleUrls: ['./clinica-form.component.scss']
})
export class ClinicaFormComponent implements OnInit {
  // Formulário principal reativo
  clinicaForm: FormGroup;

  // Listas de apoio para os selects
  regionais: any[] = [];
  especialidades: any[] = [];

  // Flags para modo edição, carregamento e validação
  isEditMode = false;
  clinicaId: string | null = null;
  formSubmitted = false;
  isLoading = true;

  // Controla expansão visual (não está mais sendo usado)
  mostrarTodasEspecialidades = false;

  // Referência ao modal de exclusão
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: ElementRef;
  private modalInstance: any;

  constructor(
    private fb: FormBuilder,
    private clinicaService: ClinicaService,
    private router: Router,
    private route: ActivatedRoute,
    private appComponent: AppComponent
  ) {
    // Inicialização do formulário com validações
    this.clinicaForm = this.fb.group({
      razao_social: ['', Validators.required],
      nome_fantasia: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.maxLength(18)]],
      regional_id: ['', Validators.required],
      data_inauguracao: ['', Validators.required],
      ativa: [false],
      especialidades: [[], [this.minSelected(1)]] // precisa selecionar pelo menos uma
    });
  }

  ngOnInit(): void {
    // Recupera ID da clínica se estiver editando
    this.clinicaId = this.route.snapshot.paramMap.get('id');
    const routePath = this.route.snapshot.routeConfig?.path;

    // Verifica se estamos no modo edição
    this.isEditMode = !!(this.clinicaId && routePath?.includes('editar'));

    // Carrega dados auxiliares (regionais e especialidades)
    Promise.all([
      this.clinicaService.getRegionais().toPromise().then(res => this.regionais = res),
      this.clinicaService.getEspecialidades().toPromise().then(res => this.especialidades = res)
    ]).then(() => {
      // Se for edição, carrega dados da clínica para preencher o formulário
      if (this.isEditMode && this.clinicaId) {
        this.clinicaService.getClinica(this.clinicaId).subscribe((data: any) => {
          this.clinicaForm.patchValue({
            razao_social: data.razao_social,
            nome_fantasia: data.nome_fantasia,
            cnpj: data.cnpj,
            regional_id: data.regional_id,
            data_inauguracao: data.data_inauguracao,
            ativa: data.ativa,
            especialidades: data.especialidades.map((e: any) => e.id)
          });
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }

  // Validador customizado: obriga selecionar pelo menos N itens (usado em especialidades)
  minSelected(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || [];
      return value.length >= min ? null : { minSelected: true };
    };
  }

  // Abre o modal de confirmação de exclusão
  abrirModalExclusao(): void {
    this.modalInstance = new bootstrap.Modal(
      document.getElementById('confirmDeleteModal')
    );
    this.modalInstance.show();
  }

  // Confirma a exclusão da clínica
  confirmarExclusao(): void {
    this.modalInstance.hide();

    if (this.clinicaId) {
      this.clinicaService.deleteClinica(this.clinicaId).subscribe({
        next: () => {
          this.appComponent.showToast('Clínica excluída com sucesso!');
          this.router.navigate(['/clinicas']);
        },
        error: (err) => {
          console.error('Erro ao excluir clínica:', err);
        }
      });
    }
  }

  // Submete o formulário (criação ou edição)
  onSubmit(): void {
    this.formSubmitted = true;

    if (this.clinicaForm.valid) {
      const formData = { ...this.clinicaForm.value };

      // Remove máscara do CNPJ antes de enviar
      formData.cnpj = formData.cnpj.replace(/\D/g, '');

      const request = this.isEditMode && this.clinicaId
        ? this.clinicaService.updateClinica(this.clinicaId, formData)
        : this.clinicaService.createClinica(formData);

      request.subscribe({
        next: (res) => {
          const id = this.isEditMode ? this.clinicaId : res?.id;
          this.appComponent.showToast(this.isEditMode ? 'Clínica atualizada com sucesso!' : 'Clínica cadastrada!');
          this.router.navigate(['/clinicas'], {
            queryParams: { visualizar: id } // redireciona para visualização após salvar
          });
        },
        error: (err: any) => {
          alert('Erro ao salvar clínica');
          console.error(err);
        }
      });
    }
  }

  // Cancela e volta para a listagem de clínicas
  cancelar(): void {
    this.router.navigate(['/clinicas']);
  }
}
