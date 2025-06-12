import React, { useEffect } from 'react';

const useTitle = (title) => {
    useEffect(()=>{
        document.title =`RecipebooK | ${title}`;
    },[ ])
};

export default useTitle;