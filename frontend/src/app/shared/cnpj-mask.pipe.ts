import { Pipe, PipeTransform } from '@angular/core';

// Pipe customizado para formatar CNPJs no template
@Pipe({
  name: 'cnpjMask' // nome usado no HTML: {{ valor | cnpjMask }}
})
export class CnpjMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return ''; // Se não vier nada, retorna vazio

    // Remove qualquer caractere que não seja número
    const digits = value.replace(/\D/g, '');

    // Se não tiver exatamente 14 dígitos, retorna o valor original (evita formatar errado)
    if (digits.length !== 14) return value;

    // Aplica a máscara no formato padrão de CNPJ: 00.000.000/0000-00
    return digits.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
}
