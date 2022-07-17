import React from 'react';
import ProductCard from './ProductCard';
import ProductCardsCarousel from '../container/ProductCardsCarousel';

const TatiPlus = () => {
    return (
        <div className='jumbotron-nhm bg-purple-dark'>
            <div className="jumbotron-title">
                <h1>TATI + : Les produits à la une</h1>
                <div className='title-underline bg-striped-pink'></div>
            </div>
            <div className="products-cards">
                <ProductCardsCarousel category='tati-plus' tatiPlus={true}/>
            </div>
            <div className="tati-message">
                <div className="tati-card-image">
                    <img src="./assets/img/carte-tati-plus.png" alt="" />
                </div>
                <div className="tati-message-text">
                    <img className="tati-plus-image" src="./assets/img/tati-plus-pink.png" alt="" />
                    <p>Profitez de réductions sur 80% de notre catalogue pour 5€ par mois et de nombreux avantages en + !</p>
                    <a href="" className="btn btn-white text-purple-dark">Devenir membre</a>
                </div>
            </div>
        </div>
    );
};

export default TatiPlus;