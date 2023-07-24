import { ButtonHTMLAttributes, forwardRef } from "react";
import { styled } from "@stitches/react";
import { SLIDER_WIDTH } from "./configs";

export const SliderContainer = styled("div", {
  width: SLIDER_WIDTH,
  borderRadius: 12,
  margin: "auto",
  border: "1px solid rgba(0,0,0,0.3)",
  overflow: "hidden",
  position: "relative",
});

const NavButton = styled("button", {
  background: "rgba(255,255,255,1)",
  width: 40,
  height: 40,
  zIndex: 11,
  borderRadius: "50%",
  position: "absolute",
  cursor: "pointer",
  border: "0.5px solid rgb(0 0 0/0.3)",
  transformOrigin: "center",
  transform: "translateY(-50%)",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  "&:hover": {
    boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
    transform: "translateY(-50%) scale(1.1)",
  },
  "&:active": {
    transform: "translateY(-50%) scale(1)",
  },
  "&.--hidden": {
    opacity: 0,
    transform: "translateY(-50%) translateX(-10px) scale(0.7)",
    pointerEvents: "none",
  },
  svg: {
    width: 16,
    opacity: 0.5,
  },
});

export const StyledNextButton = styled(NavButton, {
  right: 15,
  top: "50%",
  "&.--hidden": {
    transform: "translateY(-50%) translateX(10px) scale(0.7)",
  },
});

export const StyledPrevButton = styled(NavButton, {
  left: 15,
  top: "50%",
  "&.--hidden": {
    transform: "translateY(-50%) translateX(-10px) scale(0.7)",
  },
});

export const NextButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <StyledNextButton ref={ref} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          stroke: "currentcolor",
          strokeWidth: 5.33333,
          overflow: "visible",
        }}
      >
        <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
      </svg>
    </StyledNextButton>
  );
});

export const PrevButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <StyledPrevButton ref={ref} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          stroke: "currentcolor",
          strokeWidth: 5.33333,
          overflow: "visible",
        }}
      >
        <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
      </svg>
    </StyledPrevButton>
  );
});
