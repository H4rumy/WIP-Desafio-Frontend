export function generateArticleJSON({
  selectedCustomer,
  selectedCertification,
  selectedBrand,
  selectedColor,
  selectedSize,
  pares,
  codigoPK,
  designacao,
  refClient,
}: {
  selectedCustomer: string;
  selectedCertification: string;
  selectedBrand: string;
  selectedColor: string;
  selectedSize: string;
  pares: string;
  codigoPK: string;
  designacao: string;
  refClient: string;
}) {
  const articleData = {
    customer: selectedCustomer,
    certification: selectedCertification,
    brand: selectedBrand,
    color: selectedColor,
    size: selectedSize,
    pairs: pares,
    code: codigoPK,
    description: designacao,
    referenceCostumer: refClient,
  };

  const blob = new Blob([JSON.stringify(articleData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `article_${codigoPK}.json`; // ou outro nome que quiseres
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
