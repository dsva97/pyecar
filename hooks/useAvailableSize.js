import { useMemo, useState, useEffect } from "react";
import { getSpaceAvailable } from "../utils/getSpaceAvailable";

/**
 * First Small and then syncronized with the store
 * @param {HTMLElement | null} element HTMLElement | null
 */
export const useAvailableSize = (element, open, callback = console.log) => {
  const [smallSize, setSmallSize] = useState({ width: null, height: null });
  const [largeSize, setLargeSize] = useState({ width: null, height: null });

  useEffect(() => {
    if (element) {
      const { width, height } = getSpaceAvailable(element);
      setSmallSize({ width, height });
    }
  }, [element]);
  useEffect(() => {
    if (element) {
      let sizes;

      // Is Open
      if (open) {
        sizes = smallSize;
      }
      // Is Hidden
      else {
        if (largeSize.width) {
          sizes = largeSize;
        } else {
          sizes = getSpaceAvailable(element);
          setLargeSize(sizes);
        }
      }

      callback(sizes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, element]);
  // const [currentSize, setCurrentSize] = useState({ width: null, height: null });
  // const [isSmall, setIsSmall] = useState(true);

  // const isReady = useMemo(() => {
  //   return (
  //     smallSize.width !== null &&
  //     smallSize.height !== null &&
  //     largeSize.width !== null &&
  //     largeSize.height !== null &&
  //     currentSize.width !== null &&
  //     currentSize.height !== null
  //   );
  // }, [smallSize, largeSize, currentSize]);

  // const change = () => {
  //   console.log(isFull, currentSize);
  //   if (isSmall) {
  //     // cambiar a large
  //     setIsSmall(false);
  //     if (largeSize.width === null && largeSize.height === null) {
  //       const sizes = getSpaceAvailable(element);
  //       setLargeSize(sizes);
  //       setCurrentSize(sizes);
  //       return sizes;
  //     } else {
  //       setCurrentSize(largeSize);
  //       return largeSize;
  //     }
  //   } else {
  //     // cambiar a small
  //     setIsSmall(true);
  //     return smallSize;
  //   }
  // };

  // useEffect(() => {
  //   if (element) {
  //     const _smallSize = getSpaceAvailable(element);
  //     setSmallSize(_smallSize);
  //     setCurrentSize(_smallSize);

  //     const isCurrentFull = !isSmall;
  //     if (isFull !== isCurrentFull) {
  //       change();
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [element]);
  // useEffect(() => {
  //   if (isReady) {
  //     change();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isFull, isReady]);

  // return { change, isReady, size: currentSize };
};
