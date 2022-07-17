import React from 'react';

const ProductSuggested = () => {
    return (
        <div className='product'>
            <div className="img"></div>
            <div className="infos">
                <p>Produit</p>
                <span className='discount-price'>25€</span>
                <span className='real-price'>30€</span>
                <input type="submit" className='btn btn-purple-dark text-white' value={'Ajouter au panier'}/>
            </div>
        </div>
    );
};

export default ProductSuggested;