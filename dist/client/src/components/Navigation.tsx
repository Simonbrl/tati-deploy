import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import CategoryController from '../controllers/category';
import UserController from '../controllers/user';
import { ICategory } from '../interfaces/category';

const NavigationSubCategory = (props : {keyname: string}) => {
    const {keyname} = props;

    const [categories, setCategories] = useState<Array<ICategory>>([]);

    useEffect(() => {
        new CategoryController().getCategoryChildren(keyname)
            .then((categories: ICategory[]) => setCategories(categories))
            .catch((err: Error) => console.log(err))
    }, [])

    return (<>{categories.map((category: ICategory, index:number) => <Link key={index} to={`/category/${category.keyname}`}>{category.keyname}</Link>)}</>)
}

const NavigationCategoryChildren = (props: {category: ICategory}) => {
    const {category} = props;

    const [categories, setCategories] = useState<Array<ICategory>>([]);

    useEffect(() => {
        new CategoryController().getCategoryChildren(category.keyname)
            .then((categories: ICategory[]) => setCategories(categories))
            .catch((err: Error) => console.log(err))
    }, [])

    return (
        <>
        {categories.map((category: ICategory, index:number) => 
            <div key={index} className='category'>
                <div className="img"></div>
                <div className='category-content'>
                    <h3><Link to={`/category/${category.keyname}`}>{category.name}</Link></h3>
                        <NavigationSubCategory keyname={category.keyname}/>
                </div>
            </div>
            )}
        </>
    )
}

const Navigation = () => {

    const navigate = useNavigate();

    const [width, setWidth] = useState<number>(window.innerWidth);

    const [categories, setCategories] = useState<Array<ICategory>>([]);

    const handleResize = () => setWidth(window.innerWidth)

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [userCookie, setUserCookie] = useState<any|boolean>(false);

    const [search, setSearch] = useState<string>('');

    const submitSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key !== 'Enter') return
        if(search.length === 0) return
        let searchParsed = search.replace(/\s/g, '+');
        navigate(`/search/${searchParsed}`);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        if(width > 1200) setIsOpen(true);

        new CategoryController().getParentCategories(0, 0)
            .then(res => setCategories(res))
            .catch(err => console.log(err));

        new UserController().isLogged()
            .then(res => setUserCookie(res))
            .catch(err => console.log(err));
    }, []);
    
    return (
        <header>
            <div className='container header-banner'>
                <div className="menu-button" onClick={() => setIsOpen(!isOpen)}>
                    { isOpen ? <i className="fad fa-times"></i> : <i className="fad fa-bars"></i>}
                </div>
                <div className="header-logo">
                    <Link to="/">
                        <img src="/assets/img/tati.png" alt="" />
                    </Link>
                </div>
                {width > 768 &&
                    <div className="field-group">
                        <span className="field-group-text bg-white text-dark rounded-l"><i className="far fa-search"></i></span>
                        <input type="text" className="text-field bg-white text-dark rounded-r" placeholder='Rechercher un produit...' onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => submitSearch(e)}/>
                    </div>
                }
                <div className="header-banner-nav">
                    <div className="membership">
                        <Link to='/subscribe' className="btn btn-purple-dark">Devenir membre</Link>
                    </div>
                    <Link to='/cart' className='text-white'>
                        <div className="add-to-cart">
                            <i className="fad fa-shopping-cart"></i>
                        </div>
                    </Link>
                    <Link to={userCookie ? "/profile" : "/login"} className='text-white'>
                        <div className="user">
                            <i className="fad fa-user"></i>
                        </div>
                    </Link>
                </div>
            </div>
            {isOpen &&
                <nav className='header-navigation'>
                    {width < 768 &&
                        <div className="field-group">
                            <span className="field-group-text bg-white"><i className="far fa-search"></i></span>
                            <input type="text" className="text-field bg-white" placeholder='Rechercher un produit...'/>
                        </div>
                    }
                    {width < 768  &&  
                        <div className="membership">
                            <Link to='#' className="btn btn-purple-dark">Devenir membre</Link>
                        </div>
                    }
                    <ul className="nav-list">
                        {categories.map((category:ICategory,index:number) =>
                            <li key={index} className="nav-item">
                                <Link to={`/category/${category.keyname}`} className="nav-link">{category.name}</Link>
                                <div className="theme">
                                    <NavigationCategoryChildren category={category}/>
                                </div>
                            </li>
                        )}
                    </ul>

                </nav>
            }
        </header>
    );
};

export default Navigation;