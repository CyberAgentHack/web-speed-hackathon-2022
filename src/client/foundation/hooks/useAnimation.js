import BezierEasing from "bezier-easing";
import { useCallback, useState } from "react";

async function* rAF() {
  while (true) {
    const promise = new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });
    yield await promise;
  }
}

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
  const [aborted, setAborted] = useState(false);

  const startAnimation = useCallback(() => {
    // 視覚効果 off のときはアニメーションしない
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      return;
    }

    const startTime = performance.now();

    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for await (const _ of rAF()) {
        const now = performance.now();
        const elapsed = now - startTime;

        if (aborted) {
          return;
        }

        if (elapsed >= duration) {
          setValue(end);
          return;
        }

        const percentage = timingFunction(elapsed / duration);
        setValue(start + (end - start) * percentage);
      }
    })();
  }, [aborted, start, end, duration, timingFunction]);

  const abortAnimation = useCallback(() => {
    setAborted(true);
  }, []);

  const resetAnimation = useCallback(() => {
    setValue(start);
  }, [start]);

  return { abortAnimation, resetAnimation, startAnimation, value };
}

export const easeOutCubic = BezierEasing(0.2, 0.6, 0.35, 1);
