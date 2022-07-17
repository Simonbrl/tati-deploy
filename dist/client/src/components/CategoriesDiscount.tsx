import React from 'react';

const CategoriesDiscount = () => {
    return (
        <div className='jumbotron'>
            <div className="jumbotron-title">
                <h1>Parcourir nos promotions</h1>
                <div className='title-underline bg-striped-pink'></div>
            </div>
            <div className="categories-cards">
                <div className="categorie-card">
                    <img src="./assets/img/promotions/promotion-mobilier-jardin.png" alt="Mobilier de jardin" />
                    <h1>-20% sur le mobilier de jardin</h1>
                </div>
                <div className="categorie-card">
                    <img src="./assets/img/promotions/promotion-bricolage.png" alt="Bricolage" />
                    <h1>-20% sur le bricolage</h1>
                </div>
                <div className="categorie-card">
                    <img src="./assets/img/promotions/promotion-luminaires.png" alt="Luminaires" />
                    <h1>-20% sur les luminaires</h1>
                </div>
                <div className="categorie-card">
                    <img src="./assets/img/promotions/promotion-mode.png" alt="Mode" />
                    <h1>-20% sur la mode</h1>
                </div>
                <div className="categorie-card">
                    <h1>Voir tout</h1>
                </div>
            </div>
        </div>
    );
};

export default CategoriesDiscount;