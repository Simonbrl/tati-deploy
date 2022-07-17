import React from 'react';

const Subscribe = () => {
    return (
        <div className='subscribe'>
            <div className='jumbotron'>
                <p className='path'><a href='../'>Accueil</a> &gt; <b>TATI +</b></p>
                <div className='background-img'></div>
                <div className='details'>
                    <div className="logo-slogan">
                        <div className='img'></div>
                        <p>plus d'offres, <br/> plus d'économies !</p>
                    </div>
                    <p className='text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                       ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                       ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
                       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
                       sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <div className="pros">
                        <div className='item'>
                            <div className="img"></div>
                            <p>Exclusivité</p>
                        </div>
                        <div className="item">
                            <div className="img"></div>
                            <p>Promotions</p>
                        </div>
                        <div className="item">
                            <div className="img"></div>
                            <p>Livraison express</p>
                        </div>
                    </div>
                    <div className="subscribe-btn">
                        <input type="submit" className='btn btn-white text-purple-dark' value={'Devenir membre'}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscribe;