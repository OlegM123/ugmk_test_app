import axios from 'axios';

export const getProductsFromApi = async () => {
    try {
        const res = await axios.get('http://localhost:3001/products')
        return res.data;
    }
    catch (error) {
        throw(error);
    }
}