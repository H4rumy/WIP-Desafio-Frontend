//ficheiro mock com os tipos de cor
const colorsData: Record<string, Array<Record<string, string>>> = {
  "001": [ // WIPTech Pro
    { "002": "Pure Red" },
    { "006": "Soft White" },
    { "009": "Sunset Orange" },
  ],
  "253": [ // WIPTech Ultra
    { "025": "Pure Red" },
    { "085": "Soft White" },
  ],
  "563": [ // WIPTech Standard
    { "001": "Black" },
    { "002": "White" },
  ],
  "009": [ // IPCA 1
    { "001": "Green" },
    { "002": "White" },
  ],
  "632": [ // IPCA 2
    { "001": "Green" },
    { "002": "White" },
  ],
};

export function getColorsByBrand(brandCode: string) {
  return new Promise<{ success: boolean; data: Array<Record<string, string>> }>((resolve) => {
    setTimeout(() => {
      if (colorsData[brandCode]) {
        resolve({ success: true, data: colorsData[brandCode] });
      } else {
        resolve({ success: false, data: [] });
      }
    }, 300);
  });
}
