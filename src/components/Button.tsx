import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
    // Button dekhanor jonno state
    const [isVisible, setIsVisible] = useState(false);

    // Button-e click korle shobar opore scroll korar function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    // Scroll event handler - button kobe dekha jabe ta thik kore
    useEffect(() => {
        const toggleVisibility = () => {
            // Jobe user 300 pixel niche scroll korbe, tokhon button dekha jabe
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Scroll event listener jog kora holo
        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        // Button shudhu tokhoni render hobe jokhon isVisible true
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    // 👇 Shob Tailwind CSS Utility Classes byabohar kora holo 👇
                    className="
                        fixed                           /* Position: fixed */
                        bottom-5                        /* bottom: 1.25rem (20px) */
                        right-5                         /* right: 1.25rem (20px) */
                        bg-primary                     /* Background Blue color */
                        hover:bg-blue-700               /* Hover color change */
                        text-white                      /* Text color */
                        p-4                             /* Padding */
                        rounded-full                    /* Golakar button */
                        shadow-lg                       /* Shadow effect */
                        hover:shadow-xl                 /* Hover shadow effect */
                        transition-all                  /* Shob transition-er jonno */
                        duration-300                    /* Transition time */
                        ease-in-out                     /* Transition speed */
                        z-50                            /* Highest z-index */
                        text-1xl                         /* Font size boro kora */
                        focus:outline-none              /* Focus outline remove kora */
                    "
                    title="Go to top"
                >
                    &#8593; {/* Up Arrow symbol */}
                </button>
            )}
        </>
    );
};

export default ScrollToTopButton;