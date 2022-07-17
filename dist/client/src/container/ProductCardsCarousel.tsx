import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductController from '../controllers/product';
import { IProduct } from '../interfaces/product';

type Props = {
    category: string,
    tatiPlus: boolean
}

const ProductCardsCarousel = (props: Props) => {

    const { category, tatiPlus } = props;

    const navigate = useNavigate();

    const [products, setProducts] = useState<Array<IProduct>>([]);

    useEffect(() => {
        if(tatiPlus && category === 'tati-plus')
            new ProductController().getProductsTatiPlus()
                .then(res => setProducts(res))
                .catch(err => navigate('/'));
        else if(!tatiPlus && category !== 'tati-plus')
            new ProductController().getProductsByCategory(category)
                .then(res => setProducts(res))
                .catch(err => navigate('/'));
        }, [])

    const scroll = (e : any, direction : string) => {
        let container = e.target.closest('.product-cards-carousel').querySelector('ul')
        if (direction === 'left') container!.scrollLeft -= container!.clientWidth/2
        else container!.scrollLeft += container!.clientWidth/2
    }

    return (
        <div className='product-cards-carousel'>
            <span className='carousel-previous' onClick={(e) => scroll(e, 'left')}><i className="fad fa-arrow-left"></i></span>
            <ul>
            {products?.map((product, index) => <li className='product-carousel-item' key={index}><ProductCard product={product}/></li>)}
            </ul>
            <span className='carousel-next' onClick={(e) => scroll(e, 'right')}><i className="fad fa-arrow-right"></i></span>
        </div>
    );
};

export default ProductCardsCarousel;