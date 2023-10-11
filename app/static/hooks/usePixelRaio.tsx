import { useState, useLayoutEffect } from "react";

export function usePixelRatio() {
    const [ratio, setRatio] = useState(1);
    useLayoutEffect(() => {
        function updateRatio() {
            setRatio(window.devicePixelRatio);
        }
        const mqString = `(resolution: ${window.devicePixelRatio}dppx)`;
        const media = matchMedia(mqString);
        media.addEventListener("change", updateRatio);
        updateRatio();
        return () => media.removeEventListener("change", updateRatio);
    }, []);
    const root = document.documentElement;
    root.style.setProperty('--pixel-ratio', `${ratio}`)
    return ratio;
}