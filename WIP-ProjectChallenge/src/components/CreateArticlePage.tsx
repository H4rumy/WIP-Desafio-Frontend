import { useState } from "react";

export default function CreateArticlePage() {
  const [type, setType] = useState("");

  return (
    <div className="text-left w-full max-w-full">
        <div className="w-full border-b border-gray-300 mb-4" />
        <p className="text-base mb-6">Criação, Registo e Verificação de Códigos de Artigos / Articles Codes Creation, Verification and Registration </p>

      <label htmlFor="type" className="block mb-2 font-medium">
        Tipo / Kind
      </label>

      <select
        id="type"
        className="border rounded p-2 mb-4 w-64"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">-- Selecionar --</option>
        <option value="PK">PK</option>
        <option value="KM">KM</option>
      </select>

      {type === "PK" && (
        <div className="p-4 border rounded bg-gray-50 w-64">
          Informação adicional visível só quando PK está selecionado.
        </div>
      )}
    </div>
  );
}


