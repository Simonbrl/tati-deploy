/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IProduct } from '../interfaces/product';
import ProductController  from '../controllers/product';
import { ICategory } from '../interfaces/category';
import CategoryController from '../controllers/category';
import { useCookies } from 'react-cookie';
import ProductCardsCarousel from '../container/ProductCardsCarousel';

const Product = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies();
    
    const [quantity, setQuantity] = useState<number>(1);
    const [product, setProduct] = useState<IProduct>();
    const [image, setImage] = useState<string>('/assets/img/empty-image.png');
    const [parents, setParents]: [Array<ICategory>, any] = useState<Array<ICategory>>([]);

    const [oldPrice, setOldPrice] = useState<number>(0);

    const updateCookieCart = (keyname:string, quantity:number) => {
        let cookieCart:Array<any>
        if(cookies.cart) {
            cookieCart = cookies.cart;
            cookieCart.push({product: keyname, quantity: quantity});
        }
        else cookieCart = [{product: keyname, quantity: quantity}];
        setCookie('cart', cookieCart, {path: '/'});
        navigate('/cart');
    }

    useEffect(() => {
        new ProductController().getProductByKeyname(String(params.keyname))
            .then(res => {
                setProduct(res)
                setImage(product?.main_image ? product?.images![product.main_image].filename : '/assets/img/empty-image.png')
                setOldPrice(res.prices.base + ([10, 20, 30][Math.floor(Math.random() * 3)] / 100 * res.prices.base))
                document.title = res.name;
            })
            .catch(err => navigate('/'));
            
        new ProductController().getProductCategory(String(params.keyname))
            .then(res => {
                if(res)
                    new CategoryController().getCategoryParents(res.keyname)
                        .then(res => setParents(res))
                        .catch(err => navigate('/'))
            })
            .catch(err => console.log(err));
    }, [])
    return (
        <div className="main">
            <div className='jumbotron'>
                <div className='breadcrumb'>
                    <Link to='/'>Accueil</Link>
                    {parents.map((category:ICategory, index:number) => <Link key={index} to={`/category/${category.keyname}`}>{category.name}</Link>)}
                    <b>{product?.name}</b>
                </div>
                <div className='content-product'>
                    <div className="photos-product">
                        {product?.images?.map((image, index) => {
                            return <div key={index} onClick={()=>setImage(image.filename)} className='photos-product-item'><img src={image.filename} alt={product?.name} /></div>
                        })}
                    </div>
                    <div className="main-photo-product">
                        <img src={image} alt={product?.name} />
                    </div>
                    <div className="info-product">                    
                        <h1>{product?.name}</h1>
                        <div className="product-price">
                            {product?.prices.plus ? <p className="product-price-new">{product?.prices.plus}€</p> : ''}
                            <p className="product-price-new">{product?.prices.base}€</p>
                            <p className="product-price-old">{oldPrice}€</p>
                            <div className="rate">
                                <p>4,5</p>
                            </div>
                        </div>
                        <h3>DESCRIPTION</h3>
                        <p>{product?.description}</p>
                        <div className="underline"></div>
                        {/* <h2>COULEUR</h2>
                        <div className="colors">
                            <div className="color"></div>
                            <div className="color"></div>
                            <div className="color"></div>
                        </div> */}
                        <div className='add-to-cart'>
                            <div className='quantity'>
                                <h2>QUANTITÉ</h2>
                                <div className='quantity-selector'>
                                    <div className='decrement' onClick={()=>setQuantity(quantity <= 1 ? 1 : quantity-1)}>-</div>
                                    <input type="text" disabled value={quantity} />
                                    <div className='increment' onClick={()=>setQuantity(quantity >= 99 ? 99 : quantity+1)}>+</div>
                                </div>
                            </div>
                            <button className="btn btn-purple-dark" onClick={() => updateCookieCart(product!.keyname, quantity)}>AJOUTER AU PANIER</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='jumbotron-nhm bg-light'>
                <div className="jumbotron-title">
                    <h1 className='text-purple-dark'>Produits similaires</h1>
                    <div className='title-underline bg-striped-pink'></div>
                </div>
                <div className="products-cards">
                    {parents[parents.length - 1] ? <ProductCardsCarousel category={parents[parents.length - 1].keyname} tatiPlus={false} /> : ''}
                </div>
            </div>
        </div>
    );
};

export default Product;