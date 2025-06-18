import { AnimatePresence, Variants, motion } from "framer-motion";
import React, { useState } from "react";
import clsx from "clsx";

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
};

export type SwipeableViewsProps = {
  children?: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
};

export const SwipeableViews = ({
  children,
  className,
  footer,
}: SwipeableViewsProps) => {
  const childrenArray = React.Children.toArray(children);
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    if (
      index + newDirection < 0 ||
      index + newDirection >= childrenArray.length
    )
      return;
    setIndex([index + newDirection, newDirection]);
  };

  return (
    <div
      className={clsx(
        "relative ",
        "w-full max-w-sm mx-auto",
        "overflow-hidden",
        className
      )}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.3}
          onDragEnd={(_, { offset }) => {
            if (offset.x > 100) paginate(-1);
            else if (offset.x < -100) paginate(1);
          }}
        >
          {childrenArray[index]}
        </motion.div>
      </AnimatePresence>

      <div
        className={clsx(
          "absolute bottom-2 left-0 right-0",
          "flex justify-center gap-2"
        )}
      >
        {/* {cards.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))} */}
        {footer && footer}
      </div>
    </div>
  );
};
