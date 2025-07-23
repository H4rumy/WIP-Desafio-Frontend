export function generateArticleJSON({
  selectedCustomer,
  selectedCertification,
  selectedBrand,
  selectedColor,
  selectedSize,
  pares,
  codigoPK,
  descricao,
  observacoes,
  // outros campos de texto livre...
}: {
  selectedCustomer: string;
  selectedCertification: string;
  selectedBrand: string;
  selectedColor: string;
  selectedSize: string;
  pares: string;
  codigoPK: string;
  descricao: string;
  observacoes: string;
}) {
  return {
    customer: selectedCustomer,
    certification: selectedCertification,
    brand: selectedBrand,
    color: selectedColor,
    size: selectedSize,
    pairs: pares,
    code: codigoPK,
    description: descricao,
    notes: observacoes,
    // adiciona outros campos aqui conforme necessário
  };
}
