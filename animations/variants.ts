const pageVariants = {
  initial: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.2,
      type: "linear",
    },
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export { pageVariants };
