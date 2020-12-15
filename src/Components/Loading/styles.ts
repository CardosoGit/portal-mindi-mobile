import styled from "styled-components";

interface ContainerProps {
  show: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background: white;
  opacity: 0.7;
  left: 0;
  top: 0;
  height: 0;
  transition: all 0.2s;
  overflow: hidden;
  ${({ show }) =>
    show &&
    `
   height:100%;
  `};
`;
