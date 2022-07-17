import React, { useEffect, useState } from 'react';
import { IProduct } from '../interfaces/product';
import ProductController from '../controllers/product';
import { Link } from 'react-router-dom';

const HomeSlider = () => {
    const [products, setProducts] = useState<Array<IProduct>>([]);

    const [currentProduct, setCurrentProduct] = useState<number>(0);

    useEffect(() => {
        new ProductController().getRandomProducts(3)
            .then(res => setProducts(res))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='home-slider'>
            <div className="products-slider">
                {products.map((product:IProduct, index:number) => (
                    <div key={index} className={`product-slider${index === currentProduct ? ' show' : ''}`}>
                        <div className="slider-product-image">
                            {product.main_image !== null ? 
                                <img src={product.images![product.main_image].filename} alt={product.name} /> 
                            : 
                                <img src='/assets/img/empty-image.png' alt={product.name} />
                            }
                        </div>
                        <div className="slider-product-infos">
                            <div className="product-info">
                                <span className='top-product'>A la une</span>
                                <h1>{product.name}</h1>
                            </div>
                            <div className="product-price">
                                {/* <span className='old-price'>6,99 €</span> */}
                                <span className='new-price'>{product.prices.base} €</span>
                                <p>{product.short_description}</p>
                            </div>
                            <Link to={`/product/${product.keyname}`} className="btn btn-purple-dark">Voir en détails</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className='slider-controllers'>
                {products.map((product:IProduct, index:number) => (
                    <span key={index} className={`slider-controller${index === currentProduct ? ' active' : ''}`} onClick={() => setCurrentProduct(index)}></span>
                ))}
            </div>
            <div className="nape"></div>
        </div>
    );
};

export default HomeSlider;