import React from 'react';

const Skeleton = ({ className = '', ...props }) => {
    return (
        <div
            className={`animate-pulse bg-white/10 rounded-md ring-1 ring-white/5 ${className}`}
            {...props}
        />
    );
};

export default Skeleton;
