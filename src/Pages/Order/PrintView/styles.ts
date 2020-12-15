import styled from "styled-components";

interface RowProps {
  readonly horizontalCenter?: boolean;
  readonly spaceBetween?: boolean;
}

export const Container = styled.div`
  background: white;
  width: 100%;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  max-width: 400px;
  transform: translate(-100%, 0);
`;

export const Pedido = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 24px;
`;

export const Divider = styled.hr`
  border-style: dashed;
  border-bottom: none;
  margin: 0;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const Note = styled.div`
  margin-left: 10px;
`;

export const PrintRow = styled.div<RowProps>`
  width: 100%;
  position: relative;
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
