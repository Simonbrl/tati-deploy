import React from 'react';
import { Link } from 'react-router-dom';
import ProductCart from '../components/ProductCart';

const Checkout = () => {
    return (
        <div className='jumbotron'>
                <div className='breadcrumb'>
                    <Link to='/'>Accueil</Link>
                    <b>Commande n°777</b>
                </div>
                <div className="container checkout">
                    <div className="user-info">
                        <div className="mail">
                            <h2>Adresse mail</h2>
                            <button className='btn btn-purple-dark'>Modifier</button>
                        </div>
                        <div className="field-group">
                            <input type="text" className='text-field bg-white text-dark rounded' value={'mail@example.com'}  disabled/>
                        </div>
                        <h2>Adresse de livraison</h2>
                        <div className="field-group">
                            <input type="text" className='text-field bg-lightgrey text-dark rounded' placeholder='N° de rue, rue ...' />
                        </div>
                        <h2>Type de paiement</h2>
                        <h4>CARTE BANCAIRE</h4>
                        <label htmlFor="numero-carte">N° de carte</label>
                        <div className="field-group">
                            <input type="number" className='text-field bg-lightgrey text-dark rounded' placeholder='1234 ....' />
                        </div>
                        <label htmlFor="titulaire-carte">Titulaire de la carte</label>
                        <div className="field-group">
                            <input type="text" className='text-field bg-lightgrey text-dark rounded' placeholder='Nom du titulaire' />
                        </div>
                        <div className="card-info">
                            <div className='date-expiration'>
                                <label htmlFor="date-carte">Date d'expiration</label>
                                <div className="field-group">
                                    <input type="month" className='text-field bg-lightgrey text-dark rounded' />
                                </div>
                            </div>
                            <div className='cvv'>
                                <label htmlFor="cvv-carte">CVV</label>
                                <div className="field-group">
                                    <input type="number" className='text-field bg-lightgrey text-dark rounded' placeholder='000' />
                                </div>                            
                            </div>
                        </div>

                    </div>
                    <div className="order-info">
                        {
                            /*<ProductCart product={undefined} quantity={0}/>*/
                        }
                        <div className="total">
                            <h2>TOTAL : </h2>
                            <div className='price'>
                            <p className='discount-price'>105€</p>
                                <p className='real-price'>105€</p>
                            </div>
                        </div>
                        <input type="submit" className='btn btn-purple-dark' value={'COMMANDER'}/>
                    </div>
                </div>
        </div>
    );
};

export default Checkout;