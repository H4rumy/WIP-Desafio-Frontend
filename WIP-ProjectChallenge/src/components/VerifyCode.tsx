
export type DetailsType = {
    customer: Array<Record<string, string>>;
    certification: Array<Record<string, string>>;
};

export type BrandType = {
  brands: Array<Record<string, string>>;
};


export function generatePKCode(
  details: DetailsType,
  selectedCustomerCode: string,
  selectedBrandCode: string,
  pares: string,
  selectedSize: string,
  selectedCertificationCode: string
): string | null {
  if (!details || !details.customer || !details.certification ||!selectedCustomerCode ||!selectedBrandCode ||!pares || !selectedSize || !selectedCertificationCode) {
    console.error("Detalhes inválidos");
    return null;
  }

  if (!selectedCustomerCode || !pares || !selectedSize || !selectedCertificationCode) {
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

  if (!selectedBrandCode) {
    console.error("Marca não selecionada");
    return null;
  }
  const customerCode = Object.keys(customerEntry)[0];
  const certificationCode = Object.keys(certificationEntry)[0];
   const brandCode = selectedBrandCode;

  const codigo = `PK${pares}${customerCode}${brandCode}${selectedSize}${certificationCode}`;

  return codigo;
}

