import React, { useEffect, useState } from 'react';

const CookieConsent: React.FC = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const frame = document.createElement('iframe');
        frame.id = '3pc';
        frame.src = 'https://pals-petopia.netlify.app/';
        frame.style.display = 'none';
        frame.style.position = 'fixed';
        document.body.appendChild(frame);

        window.addEventListener(
            'message',
            function listen(event) {
                if (event.data === '3pcSupported' || event.data === '3pcUnsupported') {
                    document.body.removeChild(frame);
                    window.removeEventListener('message', listen);
                }
            },
            false
        );

        const cookieConsent = document.cookie.split('; ').find(row => row.startsWith('cookieConsent='));
        if (!cookieConsent) {
            setShowBanner(true);
        }
    }, []);

    const handleAcceptCookies = () => {
        document.cookie = 'cookieConsent=true; path=/; max-age=' + 85 * 24 * 60 * 60; // 85 days
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 md:p-6 flex flex-col md:flex-row justify-between items-center shadow-lg">
            <p className="mb-4 md:mb-0 text-center md:text-left">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
            </p>
            <button
                type='button'
                onClick={handleAcceptCookies}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Accept
            </button>
        </div>
    );
};

export default CookieConsent;
