import { useRef, useEffect } from "react";

interface CardAnimationProps {
  gradientColor?: string;
}

export const useCardAnimation = <T extends HTMLDivElement, K extends HTMLDivElement>(
  props?: CardAnimationProps
) => {
  const wrapperRef = useRef<T>(null);
  const cardRef = useRef<K>(null);

  useEffect(() => {
    const wrapperNode = wrapperRef.current;
    const cardNode = cardRef.current;

    if (!wrapperNode || !cardNode) return;

    const { width, height } = document.body.getBoundingClientRect();
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const onMouseMove = (e: MouseEvent) => {
      const { pageX, pageY } = e;

      const rotationX = ((pageX - halfWidth) / halfWidth) * 10;
      const rotationY = ((pageY - halfHeight) / halfHeight) * 10;

      cardNode.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

      cardNode.style.backgroundImage = `radial-gradient(
        circle farthest-side at ${pageX}px ${pageY}px,
        ${props?.gradientColor ?? "#FFF5"} 0%,
        transparent 100%
      )`;
    };

    const onMouseLeave = () => {
      cardNode.style.transform = `rotateX(0deg) rotateY(0deg)`;
      cardNode.style.backgroundImage = "none";
    };

    wrapperNode.addEventListener("mousemove", onMouseMove);
    wrapperNode.addEventListener("mouseleave", onMouseLeave);

    return () => {
      wrapperNode.removeEventListener("mousemove", onMouseMove);
      wrapperNode.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return {
    wrapperRef,
    cardRef,
  };
};
