import { useState, useLayoutEffect } from "react";

export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    const root = document.documentElement;
    root.style.setProperty('--window-width', `${size[0]}px`)
    root.style.setProperty('--window-height', `${size[1]}px`)
    return size;
}