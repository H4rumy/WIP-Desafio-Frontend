//Função que recebe os valores selecionados e devolve o código tipo PK00201509900104201.

//exemplo de uso
export function formatCode(values: {
  tipo: string;
  ano: string;
  mes: string;
  dia: string;
  numero: string;
}): string {
  const { tipo, ano, mes, dia, numero } = values;

  // Formata o código no padrão PK00201509900104201
  return `PK0${tipo}${ano}${mes}${dia}${numero.padStart(3, '0')}`;
}