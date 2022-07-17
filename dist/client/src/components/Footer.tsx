import React from 'react';

const Footer = () => {
    return (
        <div>  
            <div className="footer-header">
                <div className="pros">
                    <div className="item">
                        <div className="img"></div>
                        <p>100% des articles en stock
                        </p>
                    </div>
                    <div className="item">
                        <div className="img"></div>
                        <p>Paiement sécurisé</p>
                    </div>
                    <div className="item">
                        <div className="img"></div>
                        <p>Service client</p>
                    </div>
                </div>
            </div>
            <div className="footer-body">
                <div className="logo">
                    <div className="img"></div>
                    <p>2022 Tati project</p>
                    <p>Tous droits réservés</p>
                </div>
                <div className="infos">
                    <b>En savoir plus</b>
                    <a href="">Qui sommes-nous ?</a>
                    <a href="">Conditions générale de vente</a>
                    <a href="">Mentions légales</a>
                    <a href="">Protection des données</a>
                    <a href="">Politique de remboursement</a>
                    <a href="">Assistance client</a>
                </div>
                <div className="infos">
                    <b>Catégories</b>
                    <a href="">Mobilier d'intérieur</a>
                    <a href="">Décoration - Maison</a>
                    <a href="">Jardin - Bricolage</a>
                    <a href="">Electro - multimédia</a>
                    <a href="">Loisirs</a>
                    <a href="">Mode</a>
                </div>
                <div className="infos">
                    <b>Suivre Tati sur les réseaux</b>
                    <a href="">Facebook</a>
                    <a href="">Twitter</a>
                    <a href="">Instagram</a>
                    <a href="">Tiktok</a>
                    <a href="">Linkedin</a>
                </div>
            </div>
        </div>
    );
};

export default Footer;