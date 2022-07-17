import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Favorites from '../components/Favorites';
import Orders from '../components/Orders';
import Overview from '../components/Overview';
import UserController from '../controllers/user';
import Subscription from '../components/Subscription';
import Gifts from '../components/Gifts';
import Sponsorship from '../components/Sponsorship';
import Notifications from '../components/Notifications';

const Profile = () => {

    const navigate = useNavigate();

    const params = useParams();

    const [userCookie, setUserCookie] = useState<any|boolean>(false);
    const [param, setParam] = useState<string>(String(params.module));
    const [orders, setOrders] = useState<any>([]);

    const modules:any = {
        orders: <Orders orders={orders}/>,
        favorites: <Favorites/>,
        subscriptions: <Subscription/>,
        gifts: <Gifts/>,
        sponsorships: <Sponsorship/>,
        notifications: <Notifications/>
    }

    const logout = () => {
        new UserController().logout()
        setUserCookie(false);
        navigate('/')
    }

    useEffect(() => {
        setParam(String(params.module));
        if(params.module) if(!modules[param]) navigate('/')
        new UserController().isLogged()
            .then(res => {
                if(res) {
                    new UserController().getUser(res.id)
                        .then(res => setUserCookie(res))
                        .catch(err => console.log(err))
                }
                else navigate('/login')
            })
            .catch(err => console.log(err));

        new UserController().getOrders()
            .then(res => setOrders(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className='container profile'>
            <div className='side-panel'>
                <div className="user">
                    <div className="img"></div>
                    <div className="name">
                        <p>{userCookie.firstname} {userCookie.lastname}</p>
                    </div>
                </div>
                <div className="navigation">
                    <Link to="/profile" className='tab first'>Vue d'ensemble</Link>
                    <Link to="/profile/orders" className="tab">Mes commandes</Link>
                    <Link to="/profile/favorites" className="tab">Mes favoris</Link>
                    <Link to="/profile/subscriptions" className="tab">Mon abonnement</Link>
                    <Link to="/profile/gifts" className="tab">Cartes cadeaux</Link>
                    <Link to="/profile/sponsorships" className="tab">Parrainage</Link>
                    <Link to="/profile/notifications" className="tab">Notifications</Link>
                    <button className='btn btn-pink text-white' onClick={() => logout()}>Déconnexion</button>
                </div>
            </div>
            <div className="main-panel">
                {params.module
                    ? modules[params.module]
                    : <Overview user={userCookie}/>
                }
            </div>
            <div className="advertisement-panel">
                <div className="top"></div>
                <div className="bottom"></div>
            </div>
        </div>
    );
};

export default Profile;