import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

type Props = {
    product: any,
    quantity: number
}

const ProductCart = (props: Props) => {

    const { product, quantity } = props;

    const [cookies, setCookie, removeCookie] = useCookies();

    const [qty, setQuantity] = useState(quantity);

    const updateQuantityCart = (quantity: number) => {
        setQuantity(quantity);
        let cart = cookies.cart;
        cart.forEach((product: any) => {
            if (product.product === props.product.keyname) product.quantity = quantity;
        });
        setCookie('cart', cart, { path: '/' });
    }

    const removeFromCart = (keyname:string) => {
        let cookieCart:Array<any>
        if(cookies.cart) {
            cookieCart = cookies.cart;
            if(cookieCart.length > 1) {
                cookieCart = cookieCart.filter(item => item.product !== keyname);
                setCookie('cart', cookieCart, {path: '/'});
            }
            else removeCookie('cart', {path: '/'});
        }
    }

    return (
        <article>
            <div className="img">
                <Link to={`/product/${product?.keyname}`}><img src={product?.main_image !== null ? product?.images![product?.main_image].filename : '/assets/img/empty-image.png'} alt={product?.name} /></Link>
            </div>
            <div className="info">
                <Link to={`/product/${product?.keyname}`}><h2>{product.name}</h2></Link>
                <div className="product-price">
                    <p className="product-price-new">{product.prices.base}€</p>
                    {/* <p className="product-price-old">35€</p> */}
                </div>
                <div className="color-quantity">
                    {/* <div className="color">
                        <h2>COULEUR</h2>
                        <div></div>
                    </div> */}
                    <div className='quantity'>
                        <h2>QUANTITÉ</h2>
                        <div className='quantity-selector'>
                            <div className='decrement' onClick={()=>updateQuantityCart(qty <= 1 ? 1 : qty-1)}>-</div>
                            <input type="text" disabled value={qty} />
                            <div className='increment' onClick={()=>updateQuantityCart(qty >= 99 ? 99 : qty+1)}>+</div>
                        </div>
                    </div>
                </div>
                <p className="remove" onClick={() => removeFromCart(product.keyname)}>X</p>
            </div>
        </article>
    );
};

export default ProductCart;