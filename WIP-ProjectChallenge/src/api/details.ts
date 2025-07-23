//Funções para aceder aos dados da API 

import axios from "axios";

export async function getPKDetails() {
  const res = await axios.get("/details");
  return res.data;
}

//done