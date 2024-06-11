export const leftToRight = {
  hidden: { opacity: 0, x: -75 },
  visible: { opacity: 1, x: 0 },
};

export const rightToLeft = {
  hidden: { opacity: 0, x: 75 },
  visible: { opacity: 1, x: 0 },
};

export const bottomToTop = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
};

export const opacityAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const zoomIn = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.1,
      duration: 0.5,
    },
  },
};
