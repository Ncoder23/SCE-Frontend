import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
// import './Valentine.css';

const Valentine: React.FC = () => {
    const [scaleFactor, setScaleFactor] = useState(1);
    const [accepted, setAccepted] = useState(false);

    const handleNoClick = () => {
        setScaleFactor(prev => prev + 0.2);
        animateIcon();
    };

    const handleYesClick = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        createDoraemons(30);
        setAccepted(true);
    };

    const handlePlayAgain = () => {
        setAccepted(false);
        setScaleFactor(1);
    };

    const createDoraemons = (count: number) => {
        for (let i = 0; i < count; i++) {
            const doraemon = document.createElement('div');
            doraemon.classList.add('doraemon');
            doraemon.innerHTML = `
                <img src="/doraemon.png" alt="Doraemon" width="40" height="40" />
            `;
            doraemon.style.left = Math.random() * 100 + 'vw';
            doraemon.style.animationDuration = (4 + Math.random() * 4) + 's';
            document.body.appendChild(doraemon);

            doraemon.addEventListener('animationend', (event) => {
                if (event.animationName === 'float') {
                    doraemon.remove();
                }
            });
        }
    };

    const animateIcon = () => {
        const sadPanda = document.getElementById('sadPanda');
        if (sadPanda) {
            sadPanda.classList.remove('animate');
            void sadPanda.offsetWidth;
            const tx = (Math.random() < 0.5 ? -1 : 1) * (30 + Math.random() * 40) + "px";
            const ty = (Math.random() < 0.5 ? -1 : 1) * (30 + Math.random() * 40) + "px";
            sadPanda.style.setProperty('--tx', tx);
            sadPanda.style.setProperty('--ty', ty);
            sadPanda.classList.add('animate');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            createDoraemons(1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="valentine-container">
            <h1>
                {accepted ? "Yay! I'm So Happy!" : "Be My Valentine?"}
            </h1>

            {!accepted ? (
                <div className="buttons">
                    <button
                        id="yesBtn"
                        onClick={handleYesClick}
                        style={{ transform: `scale(${scaleFactor})` }}
                    >
                        Yes
                        <div id="sadPanda" className="popout-icon">
                        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="#fff" stroke="#000" strokeWidth="2" />
                <circle cx="15" cy="15" r="8" fill="#000" />
                <circle cx="49" cy="15" r="8" fill="#000" />
                <circle cx="22" cy="28" r="6" fill="#000" />
                <circle cx="42" cy="28" r="6" fill="#000" />
                <circle cx="22" cy="28" r="2" fill="#fff" />
                <circle cx="42" cy="28" r="2" fill="#fff" />
                <path d="M22,42 Q32,32 42,42" stroke="#000" strokeWidth="2" fill="none" />
                <circle cx="18" cy="36" r="1.5" fill="#00f" />
                <circle cx="46" cy="36" r="1.5" fill="#00f" />
              </svg>
                        </div>
                    </button>
                    <button id="noBtn" onClick={handleNoClick}>
                        No
                    </button>
                </div>
            ) : (
                <button 
                    className="play-again-btn"
                    onClick={handlePlayAgain}
                >
                    Once More
                </button>
            )}
        </div>
    );
};

export default Valentine;