//import { useState } from "react";
import { useEffect, useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import { SearchableDropdown } from "./form/SearchableDropdown";

import { getArticleTypes } from "@/api/articleTypes";
import { getPKDetails } from "@/api/details";

export default function CreateArticlePage() {
  const [types, setTypes] = useState<string[]>([]);
  const [type, setType] = useState("");
  const [details, setDetails] = useState<any>(null);

  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [number3, setNumber3] = useState("");

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
  }
}

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

  return (
    <div className="text-left w-full max-w-full">
        <div className="absolute top-0 left-0 w-screen border-b border-gray-300" />

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
          <div className="flex items-center space-x-2 p-4 w-auto">
            <IoChevronForward size={20} />
            <span>Packs de Meias / Packs Assortment Socks</span>
            <IoChevronForward size={20} />
          </div>

          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <label htmlFor="number1" className="font-medium whitespace-nowrap">
                N Pares / Nr. Pairs
              </label>
              <input
                id="number1"
                type="number"
                className="border rounded p-2 w-40"
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
                className="border rounded p-2 w-32"
                value={number2}
                onChange={(e) => handleNumberChange(setNumber2, e.target.value)}
                min={0}
                max={999}
                placeholder="0"
              />
            </div>

            <div className="flex items-center space-x-2">
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

          {/* Aqui pode entrar o restante como combobox */}
          {details && (
            <div className="grid grid-cols-2 gap-4 max-w-xl">
              <div>
                <label className="block font-medium mb-1">Customer</label>
                <select className="border p-2 rounded w-full">
                  {details.customer.map((c: Record<string, string>) => {
                    const key = Object.keys(c)[0];
                    return (
                      <option key={key} value={key}>
                        {c[key]}
                      </option>
                    );
                  })}
                </select>
              </div>
              {/* Outros dropdowns... */}
            </div>
          )}
        </>
      )}

    </div>
  )
}


