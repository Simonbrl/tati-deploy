import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductController from '../controllers/product';
import { IProduct } from '../interfaces/product';

const Search = () => {

    const params = useParams();

    const [products, setProducts] = useState<Array<IProduct>>([]);

    useEffect(() => {
        new ProductController().searchProducts(String(params.search))
        .then(res => setProducts(res))
        .catch(err => console.log(err));
    }, [params])

    return (
        <div>
            <div className='listing'>
                <div className="articles-side" style={{width:'100%'}}>
                    <div className="header">
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
                        {products.length > 0 
                        ?
                            products.map((product:IProduct, index:number) => (
                                <ProductCard key={index} product={product} />
                            ))
                        :
                            <div className='no-results'>
                                <p>Aucun résultat pour votre recherche</p>
                            </div>
                        }
                    </div>
                </div>
                </div>
        </div>
    );
};

export default Search;