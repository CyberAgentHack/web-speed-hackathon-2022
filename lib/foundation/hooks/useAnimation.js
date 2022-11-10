import BezierEasing from "bezier-easing";
import { useCallback, useRef, useState } from "react";

/**
 * @typedef {object} Params
 * @property {number} start
 * @property {number} end
 * @property {number} duration
 * @property {Function} timingFunction
 */

/**
 * @typedef {object} ReturnValue
 * @property {number} value
 * @property {Function} startAnimation
 * @property {Function} abortAnimation
 * @property {Function} resetAnimation
 */

/**
 * @param {Params} params
 * @returns {ReturnValue}
 */
export function useAnimation({ duration, end, start, timingFunction }) {
  const [value, setValue] = useState(start);
  const timer = useRef(null);

  const startAnimation = useCallback(() => {
    // 視覚効果 off のときはアニメーションしない
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    const startTime = performance.now();
    const tick = () => {
      const now = performance.now();
      const elapsed = now - startTime;

      if (elapsed >= duration) {
        setValue(end);
        return;
      }

      const percentage = timingFunction(elapsed / duration);
      setValue(start + (end - start) * percentage);

      timer.current = setTimeout(tick, 0);
    };

    timer.current = setTimeout(tick, 0);
  }, [start, end, duration, timingFunction]);

  const abortAnimation = useCallback(() => {
    if (timer.current !== null) {
      clearInterval(timer.current);
    }
  }, []);

  const resetAnimation = useCallback(() => {
    setValue(start);
  }, [start]);

  return { abortAnimation, resetAnimation, startAnimation, value };
}

export const easeOutCubic = BezierEasing(0.2, 0.6, 0.35, 1);
