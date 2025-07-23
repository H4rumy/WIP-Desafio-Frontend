
//Funçao para aceder aos dados
import axios from "axios";

export async function getArticleTypes() {
  const res = await axios.get("/article-types");
  return res.data;
}