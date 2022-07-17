import React from 'react';
import HomeSlider from '../components/HomeSlider';
import CategoriesDiscount from '../components/CategoriesDiscount';
import TatiPlus from '../components/TatiPlus';
import TatiExclu from '../components/TatiExclu';
import CategoriesProductsCarousels from '../components/CategoriesProductsCarousels';
import Footer from '../components/Footer';

const Home = () => {
    document.title = "Tati";
    return (
        <div className='main'>
            <HomeSlider/>
            <CategoriesDiscount/>
            <TatiPlus/>
            <TatiExclu/>
            <CategoriesProductsCarousels/>
            <Footer/>
        </div>
    );
};

export default Home;