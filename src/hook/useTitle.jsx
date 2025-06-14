import React, { useEffect } from 'react';

const useTitle = (title) => {
    useEffect(()=>{
        document.title =`VR📚booK | ${title}`;
    },[ ])
};

export default useTitle;