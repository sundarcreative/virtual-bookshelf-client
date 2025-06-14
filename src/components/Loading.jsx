import React from 'react';
import { motion } from "motion/react"
const Loading = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <motion.span className="loading loading-dots loading-xl" initial={{ scale: 0 }} animate={{ scale: 1 }} />
            
        </div>
    );
};

export default Loading;