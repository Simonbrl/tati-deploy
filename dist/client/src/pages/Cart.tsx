import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductCart from '../components/ProductCart';
import ProductSuggested from '../components/ProductSuggested';
import { useCookies } from 'react-cookie';
import { IProduct } from '../interfaces/product';
import ProductController from '../controllers/product';
import { useNavigate } from 'react-router-dom';
import UserController from '../controllers/user';

const Cart = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies();
    const [user, setUser] = useState<string>();
    const [products, setProducts] = useState<Array<any>>([]);
    const [total, setTotal] = useState<number>(0);
    document.title = "Panier";

    const submitOrder = () => {
        if(!user) navigate('/login')
        let productsOrder:Array<any> = [];
        products.forEach(element => productsOrder.push({product: element.product.keyname, quantity: element.quantity}))
        let order = {
            products: productsOrder,
            user: user,
            total: total
        }
        new UserController().createOrder(order)
            .then(res => {
                removeCookie('cart');
                navigate('/');
            })
            .catch(err => console.log(err));
    } 

    useEffect(() => {
        setTotal(0);
        setProducts([]);

        new UserController().isLogged()
        .then(res => {if(res) setUser(res.email)})
        .catch(err => console.log(err));
        
        if(cookies.cart) {
            cookies.cart.forEach((product:any) => {
                if(!products.find((p:IProduct) => p.keyname === product.product))
                    new ProductController().getProductByKeyname(product.product)
                        .then(res => {
                            setProducts(prev => [...prev, {product : res, quantity: product.quantity}])
                            setTotal(prev => prev + res.prices.base * product.quantity)
                        })
                        .catch(err => console.log(err));
            })
        }
    }, [cookies.cart])

    return (
        <div className='cart container'>
            <h1>MON PANIER TATI</h1>
            <div className="content-cart">
                <div className="left-side">
                    <div className="cart">
                        {products.length > 0 
                            ? products.map((product:any, index:number) => <ProductCart product={product.product} quantity={product.quantity} key={index}/>)
                            : <p>Votre panier est vide</p>
                        }
                    </div>
                    <div className="favorites">
                        <h2>MES FAVORIS</h2>
                    </div>
                </div>
                <div className="right-side">
                    {products.length > 0 &&
                        <div className="total-cart">
                            <div className="total">
                                <h2>TOTAL : </h2>
                                <div className='price'>
                                    <p className='discount-price'>{total.toFixed(2)}€</p>
                                    {/* <p className='real-price'>105€</p> */}
                                </div>
                            </div>
                            <button className='btn btn-purple-dark text-white' onClick={() => {submitOrder()}}>Valider le panier</button>
                        </div>
                    }
                    <div className="suggests">
                        <h2>SUGGESTIONS</h2>
                        <ProductSuggested/>
                        <ProductSuggested/>
                        <ProductSuggested/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;