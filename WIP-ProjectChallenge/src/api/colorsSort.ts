import axios from "axios"

export const fetchColorsSortByBrand = async (brandId: string) => {
    const response = await axios.get(`/api/colorsSort/${brandId}`)
    return response.data
}