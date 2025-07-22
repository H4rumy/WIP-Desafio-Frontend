import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"

export function CreateArticlePage() {
  const [articleTypes, setArticleTypes] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string>("")
  const [customerOptions, setCustomerOptions] = useState<{ [key: string]: string }[]>([])
  const [brandOptions, setBrandOptions] = useState<{ [key: string]: string }[]>([])
  const [colorOptions, setColorOptions] = useState<{ [key: string]: string }[]>([])
  const [certificationOptions, setCertificationOptions] = useState<{ [key: string]: string }[]>([])

  useEffect(() => {
    axios.get("/api/create-articles").then((res) => {
      setArticleTypes(res.data.data)
    })
  }, [])

  useEffect(() => {
    if (selectedType === "PK") {
      axios.get(`/api/details/${selectedType}`).then((res) => {
        setCustomerOptions(res.data.costumer)
        setCertificationOptions(res.data.certification)
      })
    }
  }, [selectedType])

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
    setBrandOptions([])
    setColorOptions([])
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">
        Criação, Registo e Verificação de Códigos de Artigos
      </h1>

      {/* Tipo / Kind */}
      <div className="mb-6 w-1/3">
        <Label>Tipo / Kind</Label>
        <Select onValueChange={handleTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Seleciona tipo..." />
          </SelectTrigger>
          <SelectContent>
            {articleTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Campos PK */}
      {selectedType === "PK" && (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label>Nº Pares / Nr. Pairs</Label>
            <Input type="number" />
          </div>

          <div>
            <Label>Packs p/Cx. / Packs per Box</Label>
            <Input type="number" />
          </div>

          <div>
            <Label>Coeficiente p/Cx. / Coefficient per Box</Label>
            <Input type="number" />
          </div>

          <div>
            <Label>Cliente / Customer</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleciona..." />
              </SelectTrigger>
              <SelectContent>
                {customerOptions.map((c, idx) => {
                  const key = Object.keys(c)[0]
                  return (
                    <SelectItem key={key + idx} value={key}>
                      {c[key]}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Mais campos aqui… (Brand, Color, Certification, etc.) */}

          <div>
            <Label>Certificação / Certification</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleciona..." />
              </SelectTrigger>
              <SelectContent>
                {certificationOptions.map((c, idx) => {
                  const key = Object.keys(c)[0]
                  return (
                    <SelectItem key={key + idx} value={key}>
                      {c[key]}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Continuar com mais campos… */}
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <Button variant="outline">Verificar Código</Button>
        <Button>Gravar</Button>
      </div>
    </div>
  )
}
