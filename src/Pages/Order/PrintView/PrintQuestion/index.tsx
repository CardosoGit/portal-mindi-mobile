import React from "react";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { View } from "Theme";

import { Container, Title, Item } from "./styles";

type PrintQuestionType = {
  title: String;
  itens: string[];
};

const PrintQuestion: React.FC<PrintQuestionType> = ({ title, itens }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();
  const searchParamValue = new URLSearchParams(search).get("searchParamName");

  return (
    <Container>
      <Title>{title}:</Title>
      {itens.map((item) => (
        <Item>- {item}</Item>
      ))}
    </Container>
  );
};

export default PrintQuestion;
