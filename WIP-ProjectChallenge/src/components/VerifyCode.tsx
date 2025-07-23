
export type DetailsType = {
    customer: Array<Record<string, string>>;
    certification: Array<Record<string, string>>;
};

export function generatePKCode(
  details: DetailsType,
  selectedCustomerCode: string,
  pares: string,
  selectedCertificationCode: string
): string | null {
  if (!details || !details.customer || !details.certification) {
    console.error("Detalhes inválidos");
    return null;
  }

  if (!selectedCustomerCode || !pares || !selectedCertificationCode) {
    console.error("Campos obrigatórios não preenchidos");
    return null;
  }

  const customerEntry = details.customer.find(entry => Object.keys(entry)[0] === selectedCustomerCode);
  if (!customerEntry) {
    console.error("Cliente não encontrado em details.customer");
    return null;
  }

  const certificationEntry = details.certification.find(entry => Object.keys(entry)[0] === selectedCertificationCode);
  if (!certificationEntry) {
    console.error("Certificação não encontrada em details.certification");
    return null;
  }

  const customerCode = Object.keys(customerEntry)[0];
  const certificationCode = Object.keys(certificationEntry)[0];

  const codigo = `PK${pares}${customerCode}${certificationCode}`;

  return codigo;
}

