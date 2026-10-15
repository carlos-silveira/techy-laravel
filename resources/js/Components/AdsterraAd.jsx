import React from 'react';

const AdsterraAd = ({ type, className = "" }) => {
    let width = 300;
    let height = 250;
    let src = "/sponsors/300x250.html";

    if (type === "728x90") {
        width = 728;
        height = 90;
        src = "/sponsors/728x90.html";
    } else if (type === "320x50") {
        width = 320;
        height = 50;
        src = "/sponsors/320x50.html";
    } else if (type === "native") {
        width = 728;
        height = 90;
        src = "/sponsors/728x90.html";
    }

    return (
        <div className={`flex justify-center items-center overflow-hidden my-6 ${className}`}>
            <iframe 
                src={src} 
                width={width} 
                height={height} 
                frameBorder="0" 
                scrolling="no"
                sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-forms allow-top-navigation-by-user-activation"
                className="max-w-full"
                title={`Adsterra Ad ${type}`}
            />
        </div>
    );
};

export default AdsterraAd;
