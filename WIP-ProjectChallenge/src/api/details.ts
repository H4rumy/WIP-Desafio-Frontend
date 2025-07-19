import axios from "axios"

export const fetchDetailsType = async (type: string) => {
    const response = await axios.get(`/api/details/${type}`)
    return response.data
}