import { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { SearchableDropdown } from "./SearchableDropdown";
import { getArticleTypes } from "@/api/articleTypes";
import { generatePKCode } from "@/components/VerifyCode";
import { getPKDetails } from "@/api/details";
import { getBrandsByCustomer } from "@/api/brands";
import { getColorsByBrand } from "@/api/colorsSort";
import {generateArticleJSON} from "@/mocks/GenerateJSON";

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

  const [peso, setPeso] = useState("");
  const [pesoCx, setPesoCx] = useState("");
  const [medida1, setMedida1] = useState("");
  const [medida2, setMedida2] = useState("");
  const [medida3, setMedida3] = useState("");
  
  const [pares, setPares] = useState("");
  const [packs, setPacks] = useState("");
  const [coeficiente, setCoeficiente] = useState("");
  const [unit, setUnit] = useState("");

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

//constantes para referencias
  const [refClient, setRefClient] = useState("");
  const [erroRefClient, setErroRefClient] = useState("");
  const [refCSS, setRefCSS] = useState("");
  const [erroRefCSS, setErroRefCSS] = useState("");
  const [barCode, setBarCode] = useState("");
  const [erroBarCode, setErroBarCode] = useState("");


  const [codigo, setCodigo] = useState("");
  useEffect(() => {
    async function fetchDetails() {
      const data = await getPKDetails();
      setDetails(data);
    }
    fetchDetails();
  }, []);

  const handleVerificarClick = () => {
    const generatedCode = generatePKCode(details, selectedCustomer,selectedBrand, selectedColor,pares,selectedSize, selectedCertification);
    if (generatedCode) {
      setCodigo(generatedCode);
    } else {
      alert("Preencha todos os campos corretamente.");
      setCodigo("");
    }
  };
  
  const handleGravarClick = () => {
  generateArticleJSON({
    selectedCustomer,
    selectedCertification,
    selectedBrand,
    selectedColor,
    selectedSize,
    pares,
    codigoPK: codigo,
    designacao,
    refClient,
  });
};


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
  if (value.trim() === "") {
    setError("");
    return;
  }

  if (value.length !== 9) {
    setError(`${fieldName} deve ter 9 dígitos.`);
  } else {
    setError("");
    console.log(`${fieldName} válida:`, value);
  }
}
// Função para validar e limitar o valor a 99
function handleTwoDigitNumberChange(
  setter: React.Dispatch<React.SetStateAction<string>>,
  val: string
) {
  if (val === "" || (/^\d+$/.test(val) && Number(val) <= 99)) {
    setter(val);
  }
}
// Função para validar e limitar o valor a 999
 function handleNumberChange(setter: React.Dispatch<React.SetStateAction<string>>, val: string) {
    if (val === "" || (/^\d+$/.test(val) && Number(val) <= 999)) {
      setter(val);
    }
  }
// Função para validar e limitar o valor a 999-float
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

// Vai buscar detalhes PK se for selecionado
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
          <p className="text-base mb-3">
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
                <IoChevronForward size={16} />
                <span>Packs de Meias / Packs Assortment Socks</span>
                <IoChevronForward size={16} />
            </div>
          <div className="flex items-center space-x-20 mb-4">
            {/* Pares */}
            <div className="flex items-center space-x-2">
              <label htmlFor="pares" className="font-medium whitespace-nowrap text-right ml-8">
                N Pares / Nr. <p></p>Pairs
              </label>
              <input
                id="Pares"
                type="number"
                className="border rounded p-2 w-64"
                value={pares}
                onChange={(e) => handleNumberChange(setPares, e.target.value)}
                min={0}
                max={999}
              />
            </div>

            {/* Packs + Coeficiente */}
            <div className="flex items-center space-x-4 ml-10">
              {/* Packs */}
              <div className="flex items-center space-x-2">
                <label htmlFor="packs" className="font-medium whitespace-nowrap text-right ml-20">
                  Packs p/Cx./ <p></p>Packs per Box
                </label>
                <input
                  id="packs"
                  type="number"
                  className="border rounded p-2 w-20"
                  value={packs}
                  onChange={(e) => handleNumberChange(setPacks, e.target.value)}
                  min={0}
                  max={999}
                  placeholder="0"
                />
              </div>

              {/* Coeficiente */}
              <div className="flex items-center space-x-2">
                <label htmlFor="coeficiente" className="font-medium whitespace-nowrap">
                  Coeficiente p/Cx./Coefficient <p></p>per Box
                </label>
                <input
                  type="number"
                  id="coeficiente"
                  className="border rounded p-2 w-40"
                  value={coeficiente}
                  step="any"
                  placeholder="0,00000000"
                  onChange={(e) => handleFloatChange(setCoeficiente, e.target.value)}
                />
              </div>
            </div>
          </div>

          {details && (
            <>
            <div className="flex items-center space-x-30">
              {/* Dropdown Customer */}
              <div className="flex items-center space-x-2">
                <label className="font-medium whitespace-nowrap text-right ml-13">Cliente / <p></p>Customer</label> 
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
                    }}
                    placeholder=""
                  />
                </div>
              </div>

              {/* Dropdown Brand */}
              <div className="flex items-center space-x-2">
                <label className="font-medium whitespace-nowrap ml-20">Marca / Brand</label>
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
            <div className="flex items-center space-x-29 mt-4">
              {/*  Cor */}
                <div className="flex items-center space-x-2">
                  <label className="font-medium whitespace-nowrap text-right">Cor - Sortimento<p></p>/ Color -<p></p>Assortment</label>
                  <div className="w-64">
                    <SearchableDropdown
                      options={colorOptions}
                      selectedValue={selectedColor}
                      onValueChange={setSelectedColor}
                      placeholder=""
                    />
                  </div>
                </div>

                {/*  Tamanho */}
                <div className="flex items-center space-x-2">
                  <label className="font-medium whitespace-nowrap ml-20">Tamanho / Size</label>
                  <div className="w-64">
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
                <div className="flex items-center space-x-2 mt-4 ml-6">
                  <label className="font-medium whitespace-nowrap text-right ">Certificacão / <p></p>Certification</label>
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
                <label htmlFor="designacao" className="font-medium whitespace-nowrap text-right ml-4">
                  Designação / Description
                </label>
                <textarea
                  id="designacao"
                  className="border rounded p-2 w-60 h-24 resize-none"
                  placeholder=""
                  value={designacao}
                  onChange={(e) => setDesignacao(e.target.value)}
                />
              </div>

              {/* Un/Unit */}
              <div className="flex items-center space-x-2">
                <label htmlFor="unit" className="font-medium whitespace-nowrap ml-30">
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
                <label htmlFor="unit" className="font-medium whitespace-nowrap text-right">
                  Preco<p></p> Un/Un <p></p>Price
                </label>
                <input
                  id="unit"
                  type="number"
                  className="border rounded p-2 w-24"
                  value={unit}
                  onChange={(e) => handleNumberChange(setUnit, e.target.value)}
                  min={0}
                  max={999}
                  placeholder=""
                />
              </div>

              {/* Moeda / Currency */}
              <div className="flex items-center space-x-2">
                <label htmlFor="currency" className="font-medium whitespace-nowrap text-right">
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
            <div className="flex flex-col space-y-6 mt-4">
              <div className="flex items-center space-x-8">
                {/* Ref. Cliente */}
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
                    className="border rounded p-2 w-60"
                    placeholder=""
                    value={refClient}
                    onChange={(e) => handleNineDigitChange(e, setRefClient, setErroRefClient)}
                    onBlur={() => validarNineDigits(refClient, setErroRefClient, "A referência do cliente")}
                  />
                  {erroRefClient && <p className="text-red-500 text-sm mt-1">{erroRefClient}</p>}
                </div>

                {/* Sustainable Comp */}
                <div className="flex items-center space-x-2">
                  <label htmlFor="sustComp" className="font-medium whitespace-nowrap ml-28">
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

              {/* CS Style Ref */}
              <div className="flex items-center space-x-2">
                <label htmlFor="refCSS" className="font-medium whitespace-nowrap mb-1 ml-28">
                  CS Style ref.
                </label>
                <input
                  id="outraRef"
                  type="text"
                  inputMode="numeric"
                  pattern="\d{9}"
                  maxLength={9}
                  className="border rounded p-2 w-60"
                  placeholder=""
                  value={refCSS}
                  onChange={(e) => handleNineDigitChange(e, setRefCSS, setErroRefCSS)}
                  onBlur={() => validarNineDigits(refCSS, setErroRefCSS, "A referência interna")}
                />
                {erroRefCSS && <p className="text-red-500 text-sm mt-1">{erroRefCSS}</p>}
              </div>

              <div className="flex items-center space-x-6">
                {/* Customer Barcode */}
                <div className="flex items-center space-x-2">
                  <label htmlFor="barCode" className="font-medium whitespace-nowrap mb-1 ml-3">
                    Customer Barcode EAN13
                  </label>
                  <input
                    id="barCode"
                    type="text"
                    inputMode="numeric"
                    pattern="\d{9}"
                    maxLength={9}
                    className="border rounded p-2 w-60"
                    placeholder=""
                    value={barCode}
                    onChange={(e) => handleNineDigitChange(e, setBarCode, setErroBarCode)}
                    onBlur={() => validarNineDigits(barCode, setErroBarCode, "Código de barras")}
                  />
                  {erroBarCode && <p className="text-red-500 text-sm mt-1">{erroBarCode}</p>}
                </div>

                {/* Peso */}
                <div className="flex items-center space-x-2">
                  <label htmlFor="peso" className="font-medium whitespace-nowrap mb-1">
                    Peso / Weight-<p></p>PK
                  </label>
                  <input
                    id="peso"
                    type="number"
                    className="border rounded p-2 w-24"
                    placeholder=""
                    value={peso}
                    onChange={(e) => handleNumberChange(setPeso, e.target.value)}
                    min={0}
                    max={999}
                  />
                  <span className="text-sm text-gray-700">Gr</span>
                </div>
              </div>
              <div className="flex items-end space-x-8 ">
                {/* Peso Cx */}
                <div className="flex items-center space-x-2">
                  <label htmlFor="pesoCx" className="font-medium whitespace-nowrap ml-10">
                    Peso Cx / Box Weight
                  </label>
                  <input
                    id="pesoCx"
                    type="number"
                    className="border rounded p-2 w-15"
                    placeholder=""
                    value={pesoCx}
                    onChange={(e) => handleTwoDigitNumberChange(setPesoCx, e.target.value)}
                    min={0}
                    max={99}
                  />
                  <span className="text-sm text-gray-700">Kg</span>
                </div>

                {/* Medidas Cx */}
                <div className="flex items-center space-x-2">
                  <label className="font-medium whitespace-nowrap">Medidas Cx / Box<p></p> Measures</label>

                  {/* Medida 1 */}
                  <input
                    type="number"
                    className="border rounded p-2 w-16 text-center"
                    value={medida1}
                    onChange={(e) => handleTwoDigitNumberChange(setMedida1, e.target.value)}
                    placeholder="00"
                  />
                  <span className="font-medium">X</span>

                  {/* Medida 2 */}
                  <input
                    type="number"
                    className="border rounded p-2 w-16 text-center"
                    value={medida2}
                    onChange={(e) => handleTwoDigitNumberChange(setMedida2, e.target.value)}
                    placeholder="00"
                  />
                  <span className="font-medium">X</span>

                  {/* Medida 3 */}
                  <input
                    type="number"
                    className="border rounded p-2 w-16 text-center"
                    value={medida3}
                    onChange={(e) => handleTwoDigitNumberChange(setMedida3, e.target.value)}
                    placeholder="00"
                  />
                  <span className="">cm</span>
                </div>
              </div>
              </div>
              
              <div className="flex justify-end items-center gap-4 p-5">
                <label className="whitespace-nowrap">Código Gerado / New Code Created</label>
                
                <input
                  type="text"
                  readOnly
                  value={codigo}
                  placeholder=""
                  className="w-72 p-2 border border-gray-200 rounded"
                />
                
                <button
                  onClick={handleVerificarClick}
                  className="px-4 py-2 border border-gray-200 rounded hover:bg-gray-100 transition"
                >
                  Verificar
                </button>
              </div>
                <div className="flex justify-end">
                  <button
                    className="border px-4 py-2 rounded bg-white hover:bg-gray-100 text-gray-800"
                    onClick={handleGravarClick}
                  > Gravar
                  </button>
                </div>
           </>
          )}
        </>
      )}
    </div>
  )
}

