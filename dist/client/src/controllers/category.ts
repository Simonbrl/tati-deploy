export default class CategoryController{
    getCategoryByKeyname = async (keyname: string) => {
        const response = await fetch(`/api/categories/${keyname}`);
        const data = await response.json();
        return data;
    }

    getAllCategories = async () => {
        const response = await fetch('/api/categories');
        const data = await response.json();
        return data;
    }

    getParentCategories = async (start: number, limit: number) => {
        const response = await fetch(`/api/categories/parents?start=${start}&limit=${limit}`);
        const data = await response.json();
        return data;
    }

    getCategoryChildren = async (keyname: string) => {
        const response = await fetch(`/api/categories/${keyname}/children`);
        const data = await response.json();
        return data;
    }

    getCategoryAllChildren = async (keyname: string) => {
        const response = await fetch(`/api/categories/${keyname}/all-children`);
        const data = await response.json();
        return data;
    }

    getCategoryParents = async (keyname: string) => {
        const response = await fetch(`/api/categories/${keyname}/parents`);
        const data = await response.json();
        return data;
    }
}