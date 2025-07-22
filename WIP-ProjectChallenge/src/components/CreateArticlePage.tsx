//Frontend da pagina

/* Tarefas:
mostrar dropdown do tipo de artigo(PK,PM..)
Mostrar os restantes campos apenas quando o tipo for PK
Gerir os dropdowns dependentes (cliente → marca → cor/sortimento)
Campos livres (peso, medidas, descrição..)
Campo de número de pares com limite (max 999)
Botão de "Verify" para gerar o código
Botão de "Gravar" para gerar e mostrar o JSON final
*/

import React from "react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';

export function CreateArticlePage() {

    const [articleType, setArticleType] = useState<string[]>([]);
    const [selectType, setSelectType] = useState("");
    const [showPKFields, setShowPKFields] = useState(false);

    useEffect(() => {
        axios.get("/api/create-articles")
            .then(response => {
                if(response.data.sucess) {
                    setArticleType(response.data.types);
                }
            });
  }, []);

  const handleTypeChange = (value: string) => {
    setSelectType(value);
    setShowPKFields(value === "PK");
  }

  //return ()


}