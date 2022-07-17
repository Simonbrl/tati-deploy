export default class ProductController{
    getProductByKeyname = async (keyname: string) => {
        const response = await fetch(`/api/products/${keyname}`)
        const data = await response.json();
        return data;
    }

    getAllProducts = async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        return data;
    }

    getProductsByCategory = async (categoryKeyname: string) => {
        const response = await fetch(`/api/categories/${categoryKeyname}/products`);
        const data = await response.json();
        return data;
    }

    getProductsTatiPlus = async () => {
        const response = await fetch(`/api/products/tati-plus`);
        const data = await response.json();
        return data;
    }

    getProductCategory = async (keyname: string) => {
        const response = await fetch(`/api/products/${keyname}/category`);
        const data = await response.json();
        return data;
    }
    
    createProduct = async (product: Object) => {
        const response = await fetch('/api/products/create')
        const data = await response.json();
        return data;
    }
    
    searchProducts = async (search: string) => {
        const response = await fetch(`/api/search/${search.split('+').join(' ')}`);
        const data = await response.json();
        return data;
    }

    getRandomProducts = async (number:number) => {
        const response = await fetch(`/api/products/random/${number}`);
        const data = await response.json();
        return data;
    }
}