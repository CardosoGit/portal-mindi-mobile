import React from "react";
import ReactLoading from "react-loading";

import { Container } from "./styles";

type LoadingType = {
  show: boolean;
  size?: string;
};

const Loading: React.FC<LoadingType> = ({ size, show }) => {
  return (
    <Container show={show}>
      <ReactLoading
        {...(size && { width: size, height: size })}
        type={"spin"}
        color="#18a797"
      />
    </Container>
  );
};

export default Loading;
