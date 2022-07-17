import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../pages/Product';
import { IProduct } from '../interfaces/product';
import ProductController from '../controllers/product';

type Props = {orders: any}

const ProductCart = (props: {keyname: any, quantity: number}) => {
    const {keyname, quantity} = props;

    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        new ProductController().getProductByKeyname(keyname)
            .then(res => setProduct(res))
            .catch(err => console.log(err));
    }, [])

    return(
        <article>
            <div className="img">
                <Link to={`/product/${product?.keyname}`}><img src={product?.main_image !== null ? product?.images![product?.main_image].filename : '/assets/img/empty-image.png'} alt={product?.name} /></Link>
            </div>
            <div className="info">
                <Link to={`/product/${product?.keyname}`}><h2>{product?.name}</h2></Link>
                <div className="product-price">
                    <h2 className="text-pink">{product?.prices.base}€</h2>
                </div>
                <div className="color-quantity">
                    <div className='quantity'>
                        <h2>QUANTITÉ : {quantity}</h2>
                    </div>
                </div>
            </div>
        </article>
    )
}

const OrderCart = (props: {order : any}) => {
    const date = (date:string) => date.split('T')[0].split('-').reverse().join('/');
    const {order} = props;
    const [totalQuantity, setTotalQuantity] = useState(0);
    useEffect(() => {
        setTotalQuantity(0)
        order.products.forEach((element:any) => setTotalQuantity(prev => prev + element.quantity));
    }, [])

    return(
        <>
            <h3>Commande n°{order._id.slice(0,8).toUpperCase()} du {date(order.date)}</h3>
            <div className="order">
                <div className="products-order-listing">
                    {order.products.map((product: any, index: number) =>
                        <ProductCart key={index} keyname={product.product} quantity={product.quantity} />
                    )}
                </div>
                <div className="recap">
                    <h2>{totalQuantity} articles</h2>
                    <p className='price'>{order.total}</p>
                </div>
            </div>
        </>
    )
    
}

const Orders = (props: Props) => {
    const { orders } = props;

    return (
        <div className='orders-tab'>
            <div className="active-tab">
                <i className="fas fa-chevron-left"></i>
               <span>Mes commandes</span>
            </div>
            <div className="content-overview">
                {orders.length > 0 
                    ? orders.map((order: any, index: number) =><OrderCart key={index} order={order} />)
                    : <h2>Vous n'avez pas encore effectué de commande</h2>
                }
            </div>
        </div>
    );
};

export default Orders;