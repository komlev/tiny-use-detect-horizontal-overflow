import { useCallback, useEffect, useRef } from "react";

const throttle = (func, timeFrame) => {
  let ts = 0;
  return (...args) => {
    const now = Date.now();
    if (now - ts >= timeFrame) {
      func(...args);
      ts = now;
    }
  };
};

const isEqual = (a, b) =>
  a && b && a.size === b.size && [...a].every((value) => b.has(value));

export const useDetectHorizontalOverflow = (
  containerRef,
  callback,
  itemsParentRef,
  throttleTimeout = 16
) => {
  const lastResult = useRef(null);
  const callResult = useCallback(
    (result) => {
      if (!isEqual(result, lastResult.current)) {
        callback([...result]);
        lastResult.current = result;
      }
    },
    [callback]
  );

  useEffect(() => {
    const container = containerRef && containerRef.current;
    const itemsParent = itemsParentRef && itemsParentRef.current;
    if (!container) return;

    const parent = itemsParent || container;
    let func = (entries) => {
      if (!entries.length) return null;

      const endX = entries[0].contentRect.width;
      const children = parent.childNodes;
      const result = new Set();
      children.forEach((node) => {
        const element = node;
        if (element.offsetLeft + element.offsetWidth > endX) {
          result.add(element);
        }
      });

      callResult(result);
    };

    if (throttleTimeout > 0) {
      func = throttle(func, throttleTimeout);
    }

    const resizeObserver = new ResizeObserver(func);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [containerRef, callResult, itemsParentRef, throttleTimeout]);
};
