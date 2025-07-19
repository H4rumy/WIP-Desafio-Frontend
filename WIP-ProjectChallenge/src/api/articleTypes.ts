import axios from "axios"

export const fetchArticleTypes = async () => {
    const response = await axios.get("/api/create-articles");
    return response.data
}