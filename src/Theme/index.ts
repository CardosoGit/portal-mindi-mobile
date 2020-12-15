import styled from "styled-components";

interface ViewProps {
  readonly horizontalCenter?: boolean;
  readonly spaceBetween?: boolean;
}

interface AppContentProps {
  readonly bottomPadding?: boolean;
}

export const Row = styled.div<ViewProps>`
  width: 100%;
  position: relative;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
  ${({ horizontalCenter }) =>
    horizontalCenter &&
    `
  display:flex;
  justify-content:center;
`}

  ${({ spaceBetween }) =>
    spaceBetween &&
    `
  display:flex;
  justify-content:space-between;
`}
`;

export const View = styled.div`
  text-align: left;
`;

export const AppContent = styled.div<AppContentProps>`
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 70px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  ${({ bottomPadding }) =>
    bottomPadding &&
    `
  padding-bottom:70px;
`}
`;
