import React, { useEffect, useState } from 'react';
import UserController from '../controllers/user';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    document.title = "Connexion";
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [birthdate, setBirthdate] = useState<string>();

    const [error, setError] = useState<string>('');

    const [isLogged, setIsLogged] = useState<boolean>(false);

    const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!email || !password) return;
        new UserController().login(email, password)
        .then(res => {
            if(!res) setError('Email ou mot de passe incorrect');
            else navigate(-1)
                
        })
        .catch(err => console.log(err));
    }

    const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!email || !password || !firstname || !lastname || !birthdate) return;
        new UserController().register(email, password, firstname, lastname, birthdate)
        .then(res => {
            if(res.message === 'success')
                new UserController().login(email, password)
                .then(res => {
                    if(res){
                        navigate(-1)
                        setIsLogged(true)
                    }
                })
                .catch(err => console.log('login', err));
            else if(res.message == 'exists') setError('Email déjà utilisé');
            else setError('Erreur lors de l\'inscription');
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        new UserController().isLogged()
        .then(res => {
            if(res) {
                navigate(-1)
                setIsLogged(true)
            }
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div className='container'>
            <div className="content">
                <div className="img"></div>
                {!isShown && (
                <div className="login-register">
                    <form onSubmit={(e) => submitLogin(e)}>
                        <h1>Se connecter</h1>
                        {error ? <p className='text-red'>{error}</p> : ''}
                        <p>Adresse mail</p>
                        <div className="field-group">
                            <span className="field-group-text bg-white text-dark rounded-l"><i className="far fa-at"></i></span>
                            <input type="text" name='email' className='text-field bg-white text-dark rounded-r' placeholder='Adresse mail' onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <p>Mot de passe</p>
                        <div className="field-group">
                            <span className="field-group-text bg-white text-dark rounded-l"><i className="far fa-lock"></i></span>
                            <input type="password" name='password' className='text-field bg-white text-dark rounded-r' placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <input type="submit" className='btn btn-purple-dark text-white' value={'Se connecter'}/>

                        <a className='forgot-pwd' href="">Mot de passe oublié ?</a>
                    </form>
                </div>
                )}
                {isShown && (
                <div className="login-register">
                    <form onSubmit={(e) => submitRegister(e)}>
                        <h1>S'inscrire</h1>
                        {error ? <p className='text-red'>{error}</p> : ''}
                        <p>Adresse mail</p>
                        <div className="field-group">
                            <span className="field-group-text bg-white text-dark rounded-l"><i className="far fa-at"></i></span>
                            <input type="text" name='email' className='text-field bg-white text-dark rounded-r' placeholder='Adresse mail' onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <p>Nom</p>
                        <div className="field-group">
                            <span className="field-group-text bg-white text-dark rounded-l"></span>
                            <input type="text" name='name' className='text-field bg-white text-dark rounded-r' placeholder='Nom' onChange={(e) => setLastname(e.target.value)}/>
                        </div>

                        <p>Prénom</p>
                        <div className="field-group">
                            <span className="field-group-text bg-white text-dark rounded-l"></span>
                            <input type="text" name='first-name' className='text-field bg-white text-dark rounded-r' placeholder='Prénom' onChange={(e) => setFirstname(e.target.value)}/>
                        </div>

                        <p>Date de naissance</p>
                        <div className="field-group">
                            <span className="field-group-text bg-white text-dark rounded-l"></span>
                            <input type="date" name='birth' className='text-field bg-white text-dark rounded-r' placeholder='JJ/MM/AAAA' onChange={(e) => setBirthdate(e.target.value)}/>
                        </div>

                        <p>Mot de passe</p>
                        <div className="field-group">
                            <span className="field-group-text bg-white text-dark rounded-l"><i className="far fa-lock"></i></span>
                            <input type="password" name='password' className='text-field bg-white text-dark rounded-r' placeholder='Mot de passe' onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <input type="submit" className='btn btn-purple-dark text-white' value={'Se connecter'}/>
                    </form>
                </div>
                )}
            </div>
            {!isShown && (
            <div className='state-account'>
                <span>Pas de compte ? </span><a onClick={() => {setIsShown(!isShown); setError('')}}>Créer un compte</a>
            </div>
            )}
            {isShown && (
            <div className='state-account'>
                <span>Déjà inscrit ? </span><a onClick={() => {setIsShown(!isShown); setError('')}}>Se connecter</a>
            </div>
            )}
        </div>
    );
};

export default Login;