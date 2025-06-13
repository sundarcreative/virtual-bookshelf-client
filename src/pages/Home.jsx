import React from 'react';
import Slider from '../components/Slider';
import PopularBooks from '../components/PopularBooks';
import FeaturedCategory from '../components/FeaturedCategory';
import AdditionalSections from '../components/AdditionalSections';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <PopularBooks></PopularBooks>
            <FeaturedCategory></FeaturedCategory>
            <AdditionalSections></AdditionalSections>
        </div>
    );
};

export default Home;