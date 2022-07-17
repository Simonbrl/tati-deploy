import React from 'react';
import ProductCardsCarousel from '../container/ProductCardsCarousel';

const TatiExclu = () => {
    return (
        <div className='jumbotron-nhm bg-light'>
            <div className="jumbotron-title">
                <h1 className='text-purple-dark'>Exclusivité TATI + du moment</h1>
                <div className='title-underline bg-striped-pink'></div>
                <p className='text-dark'>Devenez membre afin d'avoir accès à de nombreuses exclusivités.</p>
            </div>
            <div className="products-cards">
                <ProductCardsCarousel category='tati-plus' tatiPlus={true}/>
            </div>
        </div>
    );
};

export default TatiExclu;