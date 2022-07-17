import React, { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import CategoryController from '../controllers/category';
import ProductController  from '../controllers/product';
import { ICategory } from '../interfaces/category';
import { IProduct } from '../interfaces/product';
import CategoriesMenuListing from '../components/CategoriesMenuListing';

const Listing = () => {
    const navigate = useNavigate();
    const params = useParams();
    
    const [isShown, setIsShown]: [boolean, any] = useState<boolean>(false);

    const [products, setProducts]: [Array<IProduct>, any] = useState<Array<IProduct>>([]);

    const [categories, setCategories]: [any, any] = useState<any>([]);

    const [parents, setParents]: [Array<ICategory>, any] = useState<Array<ICategory>>([]);

    useEffect(() => {        
        new ProductController().getProductsByCategory(String(params.keyname))
        .then(res => setProducts(res))
        .catch(err => navigate('/')); 

        new CategoryController().getCategoryParents(String(params.keyname))
        .then(res => {
            setParents(res);
            document.title = res[res.length-1].name;
            new CategoryController().getCategoryAllChildren(res[0].keyname)
                .then(res => setCategories(res))
                .catch(err => navigate('/'));
        })
        .catch(err => navigate('/'));
    }, [params]);
    
    return (
        <div className='listing'>
            <div className='filter-side'>
                <CategoriesMenuListing category={categories}/>
                <div className='btn-filters' onClick={() => setIsShown(!isShown)}>
                    FILTRES
                    {/* mettre chevron */}
                </div>
                {isShown && (
                <div className='filters'>
                    <div className='price-range'>
                        <p>Prix</p>
                        <p className='price-output'>entre 0 et 1 000€</p>
                        <div className='range'></div>
                    </div>
                    <div className="sizes">
                        <p>Tailles</p>
                        <div className='grid-sizes'>
                            <div className='size'>
                                <input type="checkbox" />
                                <p>120mm x 160mm</p>
                            </div>
                            <div className='size'>
                                <input type="checkbox" />
                                <p>160mm x 200mm</p>
                            </div>
                            <div className='size'>
                                <input type="checkbox" />
                                <p>90mm x 200mm</p>
                            </div>
                            <div className='size'>
                                <input type="checkbox" />
                                <p>80mm x 240mm</p>
                            </div>
                            <div className='size'>
                                <input type="checkbox" />
                                <p>100mm x 160mm</p>
                            </div>
                        </div>
                    </div>
                    <div className="btn btn-pink text-white">Valider</div>
                </div>
                )}

            </div>
            <div className='articles-side'>
                <div className="header">
                    <div className='breadcrumb'>
                        <Link to='/'>Accueil</Link>
                    {parents.map((category:ICategory, index:number) => 
                        category.keyname === params.keyname 
                        ? <b key={index}>{category.name}</b>
                        : <Link key={index} to={`/category/${category.keyname}`}>{category.name}</Link>
                    )}
                    </div>
                    <div>
                        <select name="" className="dpdwn" id="">
                            <option value="">Trier</option>
                            <option value="pertinence">Pertinence</option>
                            <option value="price-asc">Prix croissant</option>
                            <option value="price-desc">Prix décroissant</option>
                            <option value="name-asc">Nom A-Z</option>
                            <option value="name-desc">Nom Z-A</option>
                        </select>
                    </div>
                </div>
                <div className='articles'>
                    {products.map((product:IProduct, index:number) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Listing;