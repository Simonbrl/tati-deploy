import React from 'react';
import { Link, useParams } from 'react-router-dom';

const CategoriesMenuListing = ({category, index=-1}:any) => {
    const params = useParams();
    index++
    return (
        category.children?.length > 0 
        ?
            <ul className={index === 0 ? 'theme' : ''}>
                <li style={{marginLeft:`${index}rem`}}>
                    <Link className={category.keyname === params.keyname ? "text-pink" : ""} to={`/category/${category.keyname}`}>{category.name}</Link>
                </li>
                
                <ul className={
                    index === 1 
                    ? category.keyname !== params.keyname 
                        ? category.children?.find((c:any) => c.keyname === params.keyname) 
                            ? 'category'
                            : 'category hidden'
                        : 'category'
                    : ''
                }>
                    {category.children.map((child:any, key:number) => <CategoriesMenuListing key={key} category={child} index={index}/>)}
                </ul>
            </ul>
        :
            <li style={{marginLeft:`${index}rem`}}>
                <Link className={category.keyname === params.keyname ? "text-pink" : ""} to={`/category/${category.keyname}`}>{category.name}</Link>
            </li>
    );
};

export default CategoriesMenuListing;