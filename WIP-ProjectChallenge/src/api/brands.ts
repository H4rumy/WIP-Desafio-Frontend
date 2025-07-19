import axios from "axios"

export const fetchBrandsByCostumer = async (customerId:string) => {
    const response = await axios.get(`/api/brands/${customerId}`)
    return response.data
}