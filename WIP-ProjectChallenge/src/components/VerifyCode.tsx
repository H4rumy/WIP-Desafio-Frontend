
export type DetailsType = {
  customer: Array<Record<string, string>>;
};

export function generatePKCode(details: DetailsType, selectedCustomerCode: string, pares: string): string | null {
  if (!details || !details.customer) {
    console.error("Detalhes inválidos");
    return null;
  }

  if (!selectedCustomerCode || !pares) {
    console.error("Customer ou pares não preenchidos");
    return null;
  }

  const customerEntry = details.customer.find((entry) => {
    const key = Object.keys(entry)[0];
    return key === selectedCustomerCode;
  });

  if (!customerEntry) {
    console.error("Cliente não encontrado em details.customer");
    return null;
  }

  const customerCode = Object.keys(customerEntry)[0];

  const codigo = `PK${pares}${customerCode}`;

  return codigo;
}
