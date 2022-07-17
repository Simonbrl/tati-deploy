export default class UserController{
    getUser = async (id: string) => {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        return data;
    }

    isLogged = async () => {
        const response = await fetch('/api/users/cookie');
        const data = await response.json();
        return data;
    }

    login = async (email: string, password: string) => {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();
        return data;
    }

    register = async (email: string, password: string, firstname:string, lastname:string, birthdate:string) => {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname,
                birthdate: birthdate
            })
        });
        const data = await response.json();
        return data;
    }

    logout = async () => {
        const response = await fetch('/api/logout');
        const data = await response.json();
        return data;
    }

    createOrder = async (order: any) => {
        const response = await fetch('/api/orders/create/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        const data = await response.json();
        return data;
    }

    getOrders = async () => {
        const response = await fetch('/api/orders/get');
        const data = await response.json();
        return data;
    }
}