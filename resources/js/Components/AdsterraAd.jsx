import React from 'react';

const AdsterraAd = ({ type, className = "" }) => {
    let width = 300;
    let height = 250;
    let src = "/ads/300x250.html";

    if (type === "728x90") {
        width = 728;
        height = 90;
        src = "/ads/728x90.html";
    } else if (type === "320x50") {
        width = 320;
        height = 50;
        src = "/ads/320x50.html";
    } else if (type === "native") {
        width = "100%";
        height = 300; // Native can be flexible
        src = "/ads/native.html";
    }

    return (
        <div className={`flex justify-center items-center overflow-hidden my-6 ${className}`}>
            <iframe 
                src={src} 
                width={width} 
                height={height} 
                frameBorder="0" 
                scrolling="no"
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"
                className="max-w-full"
                title={`Adsterra Ad ${type}`}
            />
        </div>
    );
};

export default AdsterraAd;
