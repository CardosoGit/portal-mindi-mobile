import styled from "styled-components";

interface ViewProps {
  readonly horizontalCenter?: boolean;
}

export const Row = styled.div<ViewProps>`
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: left;
  ${({ horizontalCenter }) =>
    horizontalCenter &&
    `
  display:flex;
  justify-content:center;
`}
`;

export const View = styled.div`
  text-align: left;
`;

export const AppContent = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 70px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
`;
