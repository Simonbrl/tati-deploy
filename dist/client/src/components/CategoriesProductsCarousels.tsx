import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCardsCarousel from '../container/ProductCardsCarousel';
import CategoryController from '../controllers/category';
import { ICategory } from '../interfaces/category';

const CategoriesProductsCarousels = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = React.useState<Array<ICategory>>([]);

    useEffect(() => {
        new CategoryController().getParentCategories(0,3)
            .then(res => setCategories(res))
            .catch(err => navigate('/'));
    }, [])

    return (
        <div className='categories-products-carousels'>
            {categories.map((category, key) => (
            <div key={key} className='jumbotron-nhm bg-light'>
                <div className="jumbotron-title">
                    <h1 className='text-purple-dark'>{category.name}</h1>
                    <div className='title-underline bg-striped-pink'></div>
                </div>
                <div className="products-cards">
                    <ProductCardsCarousel category={category.keyname} tatiPlus={false}/>
                </div>
            </div>
            ))}
        </div>
    );
};

export default CategoriesProductsCarousels;