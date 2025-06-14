import React from 'react';
import useTitle from '../hook/useTitle';
import Lottie from 'lottie-react';
import error from '../assets/animation/error.json'
import { NavLink } from 'react-router';

const ErrorPage = () => {
    useTitle("error")
    return (
        <div className='flex flex-col justify-center items-center  '>
              <div
                        className="relative h-screen w-full bg-cover bg-center bg-no-repeat  items-center  rounded-2xl"
                        style={{
                            backgroundImage: "url('https://i.ibb.co/99X4V6cw/book-white-background.jpg')",
                        }}
                    >
                        {/* Overlay */}
                        {/* <div className="absolute inset-0 bg-black opacity-50 z-0"></div> */}
                    
             <div className='flex flex-col justify-center items-center mt-35'>
                <Lottie animationData={error} loop={true} style={{ width: 500, height: 500 }}  />
                    <h1 className='text-5xl  text-rose-500 font-bold'>Page Not Found</h1>
                    <NavLink to='/'><button className='btn btn-primary mt-8'>GO BACK TO HOME</button></NavLink>
          
             </div>
            </div>
        </div>
    );
};

export default ErrorPage;