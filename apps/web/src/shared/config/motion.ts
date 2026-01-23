export const spring = {
    soft: { type: "spring", stiffness: 100, damping: 20 },
    bouncy: { type: "spring", stiffness: 300, damping: 15 }, // Squishy feel
    snappy: { type: "spring", stiffness: 400, damping: 30 }, // Immediate response
};

export const layoutTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30
};

export const pageTransition = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.4, ease: "easeOut" }
};
