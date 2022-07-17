import React from 'react';
import { Link } from 'react-router-dom';

type Props = {product: any}

const ProductCard = (props: Props) => {

    const { product } = props;

    let prices:any = null
    if(Array.isArray(product.prices)) prices = product.prices[0]
    else prices = product.prices

    const oldPrice = prices.base + ([10, 20, 30][Math.floor(Math.random() * 3)] / 100 * prices.base);

    return (
        <Link to={`/product/${product.keyname}`}>
            <div className={`product-card${prices.plus ? ' tati-plus-icon' : ''}`}>
                <div className="product-card-body">
                    <img className="product-card-image" src={product.images.length > 0 ? product.images[product.main_image].filename_small : "/assets/img/empty-image.png"} alt={product.name} />
                </div>
                <div className="product-card-footer">
                    <h1 className="product-card-name" title={product.name}>{product.name}</h1>
                    <div className="product-card-price">
                        <span className="product-price-new">{prices.base}€</span>
                        <span className="product-price-old">{oldPrice}€</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;