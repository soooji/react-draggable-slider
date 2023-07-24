import { useCallback, useRef, useState } from "react";
import "./App.css";
import useSWR from "swr";
import { SLIDE_ITEM_WIDTH, SLIDES_GAP, fetcher } from "./configs";
import {
  motion,
  useAnimate,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { NextButton, PrevButton, SliderContainer } from "./Components";
import { SlideItems } from "./SlideItems";
import { Image } from "./types";

function App() {
  const constraintsRef = useRef<HTMLDivElement | null>(null);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);
  const [scope, animate] = useAnimate<HTMLDivElement>();

  const { data: pagesData, isLoading } = useSWR<Image[][]>(
    "https://api.unsplash.com/photos",
    fetcher
  );
  const data = pagesData?.flat() ?? [];

  useMotionValueEvent(x, "change", (latest) => {
    const minX = -(
      scope?.current?.clientWidth - (constraintsRef?.current?.clientWidth || 0)
    );
    const tolerance = 10;

    const prevVisible = latest <= -tolerance;
    const nextVisible = latest >= minX + tolerance;

    if (prevVisible) {
      prevButtonRef.current?.classList?.remove("--hidden");
    } else {
      prevButtonRef.current?.classList?.add("--hidden");
    }

    if (nextVisible) {
      nextButtonRef.current?.classList?.remove("--hidden");
    } else {
      nextButtonRef.current?.classList?.add("--hidden");
    }
  });

  const goNext = useCallback(() => {
    x.stop();
    const newX = x.get() - (constraintsRef?.current?.offsetWidth || 0);
    const minX = -(
      scope?.current?.offsetWidth - (constraintsRef?.current?.offsetWidth || 0)
    );
    animate(scope.current, { x: newX > minX ? newX : minX }, { bounce: 0 });
  }, [animate, scope, x]);

  const goPrev = useCallback(() => {
    x.stop();
    const newX = x.get() + (constraintsRef?.current?.offsetWidth || 0);
    animate(scope.current, { x: newX > 0 ? 0 : newX }, { bounce: 0 });
  }, [animate, scope, x]);

  return (
    <>
      <SliderContainer>
        {!isLoading && (
          <>
            <NextButton ref={nextButtonRef} onClick={goNext} />
            <PrevButton
              className="--hidden"
              ref={prevButtonRef}
              onClick={goPrev}
            />
          </>
        )}

        <motion.div ref={constraintsRef} />
        <motion.div
          ref={scope}
          drag="x"
          dragTransition={{ power: 0.4 }}
          dragConstraints={constraintsRef}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{
            x,
            width: (data?.length || 0) * (SLIDE_ITEM_WIDTH + SLIDES_GAP),
            display: "flex",
            gap: SLIDES_GAP,
            padding: SLIDES_GAP,
            paddingRight: 0,
            cursor: isDragging ? "grabbing" : "grab",
          }}
          transition={{ type: "spring" }}
        >
          <SlideItems
            style={{
              pointerEvents: isDragging ? "none" : "initial",
            }}
            isLoading={isLoading}
            data={data}
          />
        </motion.div>
      </SliderContainer>
      <div
        id="ImagePreviewPortal"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      />
    </>
  );
}

export default App;
{
  /* <motion.div
        style={{
          margin: "auto",
          width: 400,
          border: "1px solid black",
          overflow: "auto",
          borderRadius: 8,
          position: "relative",
        }}
        ref={ref}
      >
        <motion.div
          // dragConstraints={ref}
          // drag="x"
          // _dragX={x}
          // dragElastic={0}
          ref={scope}
          onPan={(event, info) => {
            const newLeft = (ref.current?.scrollLeft || 0) - info.offset.x;
            console.log("newLeft", newLeft);
            ref.current?.scrollTo({
              left: newLeft,
              behavior: "smooth",
            });
            // animate(scope.current, { x: info.delta.x }, { bounce: 0 });
          }}
          style={{
            // x,
            display: "flex",
            gap: 8,
            width: "auto",
          }}
          // transition={{ type: "spring" }}
        >
          {slides.map((slide) => (
            <SlideItem key={slide}>{slide}</SlideItem>
          ))}
        </motion.div>
      </motion.div> */
}
