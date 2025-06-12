import React from 'react';
import useTitle from '../hook/useTitle';
import Lottie from 'lottie-react';
import error from '../assets/animation/error.json'

const ErrorPage = () => {
    useTitle("error")
    return (
        <div className='flex flex-col justify-center items-center  '>
              <div
                        className="relative h-screen w-full bg-contain bg-center  items-center  rounded-2xl"
                        style={{
                            backgroundImage: "url('https://i.ibb.co/cKswTKbr/alex-Faf6gz-EI3-Do-unsplash.jpg')",
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black opacity-65 z-0"></div>
                    
             <div className='flex flex-col justify-center items-center mt-35'>
                <Lottie animationData={error} loop={true} style={{ width: 400, height: 400 }}  />
             <Bounce delay={300} loop={true}>
                    <h1 className='text-5xl text-red-600 font-bold'>Error</h1>
                    <h1 className='text-5xl text-red-600 font-bold'>Page Not Found</h1>
            </Bounce>
             </div>
            </div>
        </div>
    );
};

export default ErrorPage;