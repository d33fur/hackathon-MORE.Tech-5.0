import { useState, useLayoutEffect } from "react";

import { useWindowSize } from "./useWindowSize";
import { usePixelRatio } from "./usePixelRaio";

export function useWindowParams() {
    const size = useWindowSize();
    const ratio = usePixelRatio();
    const [width, height] = size
    const k = (6 - 6) / (1920 - 300)
    const b = (6 - k * 1920)
    const step = (k * width / ratio + b) * ratio
    const root = document.documentElement;
    root.style.setProperty('--step', `${step}px`)
    return { size: size, ratio: ratio, step: step }
}