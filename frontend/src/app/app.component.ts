import { RouterOutlet } from '@angular/router';
import { Component, ViewChild, ElementRef } from '@angular/core';

// Importa objeto global do Bootstrap para instanciar o toast programaticamente
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Título geral da aplicação (opcionalmente usado no HTML)
  title = 'Sistema AmorSaude';

  // Mensagem que será exibida dentro do toast
  toastMessage = '';

  // Referência ao elemento HTML do toast, capturado pelo template
  @ViewChild('successToast', { static: false }) toastEl!: ElementRef;

  /**
   * Exibe o toast com a mensagem informada
   * @param message Texto que será mostrado dentro do toast
   */
  showToast(message: string) {
    this.toastMessage = message;

    // Cria a instância do componente de toast do Bootstrap e exibe
    const toast = new bootstrap.Toast(this.toastEl.nativeElement);
    toast.show();
  }
}
