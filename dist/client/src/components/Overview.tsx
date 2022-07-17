import React from 'react';

type Props = {user: any}

const Overview = (props: Props) => {
    const {user} = props;
    return (
        <div className='overview-tab'>
            <div className="active-tab">
                <i className="fas fa-chevron-left"></i>
               <span>Vue d'ensemble</span>
            </div>
            <div className="content-overview">
                <h2>Bonjour, {user.firstname} <b className='text-pink'>!</b></h2>
                <div className="info">
                    <h3>Mes informations</h3>
                </div>
                <div className="about-user">
                    <div className="about-item">
                        <label htmlFor="invoice_address">Adresse de facturation</label>
                        <p>{user.invoice_address}</p>
                    </div>
                    <div className="about-item">
                        <label htmlFor="delivery_address">Adresse de livraison</label>
                        <p>{user.delivery_address}</p>
                    </div>
                    <div className="about-item">
                        <label htmlFor="pay">Paiement</label>
                        <p>Carte bancaire (Mastercard **88)</p>
                    </div>
                    <div className="about-item">
                        <label htmlFor="mail">Mail</label>
                        <p>{user.email}</p>
                    </div>
                    <div className="about-item">
                        <label htmlFor="phone">Téléphone</label>
                        <p>{user.phone}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;