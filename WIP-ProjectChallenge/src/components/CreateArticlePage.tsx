//import { useState } from "react";
import { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { SearchableDropdown } from "./form/SearchableDropdown";

import { getArticleTypes } from "@/api/articleTypes";
import { getPKDetails } from "@/api/details";
import { getBrandsByCustomer } from "@/api/brands";
import { getColorsByBrand } from "@/api/colorsSort";

export default function CreateArticlePage() {
  const [types, setTypes] = useState<string[]>([]);
  const [type, setType] = useState("");
  const [details, setDetails] = useState<any>(null);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brandOptions, setBrandOptions] = useState<{ value: string; label: string }[]>([]);

  const [selectedColor, setSelectedColor] = useState("");
  const [colorOptions, setColorOptions] = useState<{ value: string; label: string }[]>([]);

  const [selectedCertification, setSelectedCertification] = useState("");
  const certificationOptions = details?.certification?.map((c: Record<string, string>) => {
    const key = Object.keys(c)[0];
    return {
      value: key,
      label: c[key],
    };
  }) || [];

  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [number3, setNumber3] = useState("");
  const [numeroB, setNumeroB] = useState("");

const [selectedUnit, setSelectedUnit] = useState("");
const unitOptions = details?.unit?.map((u: Record<string, string>) => {
  const key = Object.keys(u)[0];
  return {
    value: key,
    label: u[key],
  };
}) || [];

const [selectedCurrency, setSelectedCurrency] = useState("");
const currencyOptions = details?.currency?.map((c: Record<string, string>) => {
  const key = Object.keys(c)[0];
  return {
    value: key,
    label: c[key],
  };
}) || [];

const [selectedSustComp, setSelectedSustComp] = useState("");
const SustCompOptions = details?.sustComp?.map((u: Record<string, string>) => {
  const key = Object.keys(u)[0];
  return {
    value: key,
    label: u[key],
  };
}) || [];


  const [selectedSize, setSelectedSize] = useState("");
  const sizeOptions = Array.from({ length: 31 }, (_, i) => {
  const size = i + 10;
  return {
    value: size.toString(),
    label: size.toString(),
  };
});

  const [designacao, setDesignacao] = useState("");

  const [refClient, setRefClient] = useState("");
  const [erroRefClient, setErroRefClient] = useState("");
  const [refCSS, setRefCSS] = useState("");
  const [erroRefCSS, setErroRefCSS] = useState("");
  
function handleNineDigitChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  const val = e.target.value;
  if (/^\d{0,9}$/.test(val)) {
    setValue(val);
    setError("");
  }
}

function validarNineDigits(
  value: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
  fieldName = "A referência"
) {
  if (value.length !== 9) {
    setError(`${fieldName} deve ter exatamente 9 dígitos.`);
  } else {
    setError("");
    console.log(`${fieldName} válida:`, value);
  }
}

  
// Função para validar e limitar o valor a 999
 function handleNumberChange(setter: React.Dispatch<React.SetStateAction<string>>, val: string) {
    if (val === "" || (/^\d+$/.test(val) && Number(val) <= 999)) {
      setter(val);
    }
  }
// Função para validar e limitar o valor a 999
  function handleFloatChange(setter: React.Dispatch<React.SetStateAction<string>>, val: string) {
  if (val === "") {
    setter(val);
    return;
  }

  // Regex para número decimal até 10 casas decimais
  const regex = /^\d*\.?\d{0,10}$/;
  if (regex.test(val) && Number(val) <= 999) {
    setter(val);
  }}

// Vai buscar os tipos ao carregar a página
  useEffect(() => {
    getArticleTypes().then((res) => {
      if (res.success) {
        setTypes(res.data);
      }
    });
  }, []);

// Vai buscar detalhes PK só se for PK
  useEffect(() => {
    if (type === "PK") {
      getPKDetails().then((res) => {
        if (res.success) setDetails(res);
      });
    } else {
      setDetails(null);
    }
  }, [type]);

  // Vai buscar as brands quando o cliente é selecionado
  useEffect(() => {
  if (selectedCustomer) {
    getBrandsByCustomer(selectedCustomer).then((res) => {
      if (res.success) {
        setBrandOptions(
          res.data.map((b: Record<string, string>) => {
            const key = Object.keys(b)[0];
            return {
              value: key,
              label: b[key],
            };
          })
        );
      } else {
        setBrandOptions([]);
      }
      setSelectedBrand(""); // limpa seleção antiga
    });
  } else {
    setBrandOptions([]);
    setSelectedBrand("");
  }
  }, [selectedCustomer]);

  // Vai buscar as cores quando a marca é selecionada
  useEffect(() => {
  if (selectedBrand) {
    getColorsByBrand(selectedBrand).then((res) => {
      if (res.success) {
        setColorOptions(
          res.data.map((c: Record<string, string>) => {
            const key = Object.keys(c)[0];
            return {
              value: key,
              label: c[key],
            };
          })
        );
      } else {
        setColorOptions([]);
      }
      setSelectedColor("");
    });
  } else {
    setColorOptions([]);
    setSelectedColor("");
  }
  }, [selectedBrand]);


  return (
    <div className="text-left w-full max-w-full">
        <hr className="my-6 border-gray-300" />
          <p className="text-base mt-4 mb-6">
            Criação, Registo e Verificação de Códigos de Artigos / Articles Codes Creation, Verification and Registration 
          </p>

      <div className="flex items-center space-x-4 mb-6">
          <label htmlFor="type" className="font-medium whitespace-nowrap">
            Tipo / Kind
          </label>
          <select
            id="type"
            className="border rounded p-2 w-20"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value=""> </option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {type === "PK" && (
          <>
          <div className="flex items-center space-x-1 p-4 w-auto">
            <IoChevronForward size={20} />
            <span>Packs de Meias / Packs Assortment Socks</span>
            <IoChevronForward size={20} />
          </div>

          <div className="flex items-center space-x-35 mb-6">
            <div className="flex items-center space-x-2">
              <label htmlFor="number1" className="font-medium whitespace-nowrap">
                N Pares / Nr. Pairs
              </label>
              <input
                id="number1"
                type="number"
                className="border rounded p-2 w-50"
                value={number1}
                onChange={(e) => handleNumberChange(setNumber1, e.target.value)}
                min={0}
                max={999}
              />
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="number2" className="font-medium whitespace-nowrap">
                Packs p/Cx./ Packs per Box
              </label>
              <input
                id="number2"
                type="number"
                className="border rounded p-2 w-20"
                value={number2}
                onChange={(e) => handleNumberChange(setNumber2, e.target.value)}
                min={0}
                max={999}
                placeholder="0"
              />
            </div>

            <div className="flex items-center space-x-2  ">
              <label htmlFor="number3" className="font-medium whitespace-nowrap">
                Coeficiente p/Cx./Coefficient per Box
              </label>
              <input
                type="number"
                id="number3"
                className="border rounded p-2 w-40"
                value={number3}
                step="any"
                placeholder="0,00000000"
                onChange={(e) => handleFloatChange(setNumber3, e.target.value)}
              />
            </div>
          </div>

          {details && (
            <>
            <div className="flex items-center space-x-6">
              {/* Dropdown Customer */}
              <div className="flex items-center space-x-2">
                <label className="font-medium whitespace-nowrap">Cliente / Customer</label>
                <div className="w-64">
                  <SearchableDropdown
                    options={details.customer.map((c: Record<string, string>) => {
                      const key = Object.keys(c)[0];
                      return {
                        value: key,
                        label: c[key],
                      };
                    })}
                    selectedValue={selectedCustomer}
                    onValueChange={(val) => {
                      setSelectedCustomer(val);
                      // 🔄 Atualiza as brands conforme o cliente (ver useEffect abaixo)
                    }}
                    placeholder=""
                  />
                </div>
              </div>

              {/* Dropdown Brand */}
              <div className="flex items-center space-x-2">
                <label className="font-medium whitespace-nowrap">Marca / Brand</label>
                <div className="w-64">
                  <SearchableDropdown
                    options={brandOptions}
                    selectedValue={selectedBrand}
                    onValueChange={setSelectedBrand}
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            {/* Dropdown Color (abaixo) */}
              <div className="flex items-center space-x-2 mt-4">
                <label className="font-medium whitespace-nowrap">Cor / Color</label>
                <div className="w-64">
                  <SearchableDropdown
                    options={colorOptions}
                    selectedValue={selectedColor}
                    onValueChange={setSelectedColor}
                    placeholder=""
                  />
                </div>
                {/* Dropdown Size */}
                <div className="flex items-center space-x-2">
                  <label className="font-medium whitespace-nowrap">Tamanho / Size</label>
                  <div className="w-40">
                    <SearchableDropdown
                      options={sizeOptions}
                      selectedValue={selectedSize}
                      onValueChange={setSelectedSize}
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              {/*Dropdown Certification */}
                <div className="flex items-center space-x-2 mt-4">
                  <label className="font-medium whitespace-nowrap">Certification</label>
                  <div className="w-64">
                    <SearchableDropdown
                      options={certificationOptions}
                      selectedValue={selectedCertification}
                      onValueChange={setSelectedCertification}
                      placeholder=""
                    />
                  </div>
              </div>
              <hr className="my-6 border-gray-300" /> 


              <div className="flex items-center space-x-6 mt-4">
              {/* Designação- texto livre*/}
              <div className="flex items-center space-x-2">
                <label htmlFor="designacao" className="font-medium whitespace-nowrap">
                  Designação / Description
                </label>
                <textarea
                  id="designacao"
                  className="border rounded p-2 w-48 h-24 resize-none"
                  placeholder="Escreva a designação..."
                  value={designacao}
                  onChange={(e) => setDesignacao(e.target.value)}
                />
              </div>

              {/* Un/Unit */}
              <div className="flex items-center space-x-2">
                <label htmlFor="unit" className="font-medium whitespace-nowrap">
                  Un/Unit
                </label>
                <div className="w-40">
                  <SearchableDropdown
                    options={unitOptions}
                    selectedValue={selectedUnit}
                    onValueChange={setSelectedUnit}
                    placeholder=""
                  />
                </div>
              </div>

              {/* Preço Un/Un Price */}
              <div className="flex items-center space-x-2">
                <label htmlFor="numeroB" className="font-medium whitespace-nowrap">
                  Preco Un/Un Price
                </label>
                <input
                  id="numeroB"
                  type="number"
                  className="border rounded p-2 w-24"
                  value={numeroB}
                  onChange={(e) => handleNumberChange(setNumeroB, e.target.value)}
                  min={0}
                  max={999}
                  placeholder=""
                />
              </div>

              {/* Moeda / Currency */}
              <div className="flex items-center space-x-2">
                <label htmlFor="currency" className="font-medium whitespace-nowrap">
                  Moeda / Currency
                </label>
                <div className="w-40">
                  <SearchableDropdown
                    options={currencyOptions}
                    selectedValue={selectedCurrency}
                    onValueChange={setSelectedCurrency}
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-8 mt-4">
              {/* Ref. Cliente / Customer Ref */}
                <div className="flex items-center space-x-2">
                  <label htmlFor="referencia" className="font-medium whitespace-nowrap mb-1">
                    Ref. Cliente / Customer Ref.
                  </label>
                  <input
                    id="referencia"
                    type="text"
                    inputMode="numeric"
                    pattern="\d{9}"
                    maxLength={9}
                    className="border rounded p-2"
                    placeholder="Ex: 123456789"
                    value={refClient}
                    onChange={(e) => handleNineDigitChange(e, setRefClient, setErroRefClient)}
                    onBlur={() => validarNineDigits(refClient, setErroRefClient, "A referência do cliente")}
                  />
                  {erroRefClient && <p className="text-red-500 text-sm mt-1">{erroRefClient}</p>}
                </div>
                {/* Sustainable Comp */}
                <div className="flex items-center space-x-2">
                  <label htmlFor="sustComp" className="font-medium whitespace-nowrap">
                    Sustainable Comp.
                  </label>
                  <div className="w-40">
                    <SearchableDropdown
                      options={SustCompOptions}
                      selectedValue={selectedSustComp}
                      onValueChange={setSelectedSustComp}
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              {/* CS style*/}
                <div className="flex items-center space-x-2">
                  <label htmlFor="outraRef" className="font-medium whitespace-nowrap mb-1">
                    Referência Interna
                  </label>
                  <input
                    id="outraRef"
                    type="text"
                    inputMode="numeric"
                    pattern="\d{9}"
                    maxLength={9}
                    className="border rounded p-2"
                    placeholder="Ex: 987654321"
                    value={refCSS}
                    onChange={(e) => handleNineDigitChange(e, setRefCSS, setErroRefCSS)}
                    onBlur={() => validarNineDigits(refCSS, setErroRefCSS, "A referência interna")}
                  />
                  {erroRefCSS && <p className="text-red-500 text-sm mt-1">{erroRefCSS}</p>}
                </div>
              {/* Customer Barcode- texto livre*/}
              <div className="flex items-center space-x-2">
                <label htmlFor="CS Style" className="font-medium whitespace-nowrap">
                  CS Style
                </label>
                <textarea
                  id="CSStyle"
                  className="border rounded  resize-none h-10"
                  placeholder=""
                  value={CSStyle}
                  onChange={(e) => setCSStyle(e.target.value)}
                />
              </div>
           </>
          )}
        </>
      )}

    </div>
  )
}

