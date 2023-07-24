import { CSSProperties, FC, memo, useState } from "react";
import { SLIDER_WIDTH, SLIDE_ITEM_HEIGHT, SLIDE_ITEM_WIDTH } from "./configs";
import { styled } from "@stitches/react";
import { Image } from "./types";
import { createPortal } from "react-dom";

export const SlideItem = styled("div", {
  cursor: "pointer",
  width: SLIDE_ITEM_WIDTH,
  height: SLIDE_ITEM_HEIGHT,
  backgroundColor: "rgba(0,0,0,0.15)",
  flexShrink: 0,
  borderRadius: 8,
  fontFamily: "sans-serif",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
  boxShadow: "0 0 0 0 rgba(0,0,0,.4)",
  "&.--active": {
    boxShadow: "0 0 0 4px rgba(96, 92, 86, 0.4)",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    transition: "transform 0.1s ease-in-out",
  },
  div: {
    position: "absolute",
    transition: "opacity 0.15s ease-in-out",
    backgroundColor: "rgba(0,0,0,0.2)",
    opacity: 0,
    inset: 0,
    zIndex: 1,
  },
  "&:hover": {
    img: {
      transform: "scale(1.05)",
    },
    div: {
      opacity: 1,
    },
  },
});

const StyledFullScreenImagePreviewModal = styled("div", {
  cursor: "pointer",
  overflow: "hidden",
  width: SLIDER_WIDTH,
  height: (3 / 4) * SLIDER_WIDTH,
  transition: "opacity 0.2s ease-in-out",
  position: "relative",
  "&.--hidden": {
    opacity: 0,
    pointerEvents: "none",
  },
  ".close": {
    position: "absolute",
    zIndex: 1,
    background: "rgba(0,0,0,.4)",
    color: "white",
    fontFamily: "sans-serif",
    fontSize: "1.7rem",   
    opacity: 0,
    inset: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "opacity 0.2s ease-in-out",
  },
  "&:hover .close": {
    opacity: 1,
  },
  img: {
    backgroundColor: "rgba(0,0,0,0.15)",
    margin: "auto",
    borderRadius: 12,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
});

export const SlideItems: FC<{
  data: Image[];
  isLoading?: boolean;
  style?: CSSProperties;
}> = memo(
  ({ data, style, isLoading }) => {
    const [activeImageIndex, setActiveImageIndex] = useState(-1);

    return (
      <>
        {data?.[activeImageIndex] &&
          createPortal(
            <StyledFullScreenImagePreviewModal
              key={data[activeImageIndex]?.id}
              className={activeImageIndex == -1 ? "--hidden" : ""}
              onClick={() => setActiveImageIndex(-1)}
            >
              {data[activeImageIndex]?.urls?.full && (
                <img
                  src={data[activeImageIndex]?.urls?.full}
                  alt={data[activeImageIndex]?.alt_description}
                  loading="lazy"
                />
              )}
              <div className="close">Close</div>
            </StyledFullScreenImagePreviewModal>,
            document.getElementById("ImagePreviewPortal") as HTMLElement
          )}

        {isLoading &&
          [1, 2, 3, 4, 5].map((v) => <SlideItem key={v}></SlideItem>)}

        {!isLoading &&
          data?.map((image, index) => (
            <SlideItem
              style={style}
              className={activeImageIndex === index ? "--active" : ""}
              key={image?.id}
              onClick={() => setActiveImageIndex(index)}
            >
              <div />
              <img src={image?.urls?.small} alt="test" loading="lazy" />
            </SlideItem>
          ))}
      </>
    );
  },
  () => false
);
