
type BrandData = {
  success: boolean;
  data: Record<string, string>[];
};

// Mock dos dados da Brand API
const brandsMock: Record<string, BrandData> = {
  "001": {
    success: true,
    data: [
      { "001": "WIPTech Pro" },
      { "253": "WIPTech Ultra" },
      { "563": "WIPTech Standard" },
    ],
  },
  "025": {
    success: true,
    data: [
      { "009": "IPCA 1" },
      { "632": "IPCA 2" },
    ],
  },
};

// Função que simula pedido à API das brands dado o customerId
export function getBrandsByCustomer(customerId: string): Promise<BrandData> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (brandsMock[customerId]) {
        resolve(brandsMock[customerId]);
      } else {
        resolve({ success: false, data: [] });
      }
    }, 300); // simula delay de 300ms
  });
}

