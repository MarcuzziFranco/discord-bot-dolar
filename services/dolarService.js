import dotevn from 'dotenv'

dotevn.config();

export const getApiDolarBlue = async () => {
    const url = process.env.URL_GET_DOLAR_BLUE
    const options = { method: 'GET', headers: { Accept: 'application/json' } };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}