import React from "react";
import { Typography, Button, Collapse } from "@material-ui/core";

import { Container, Header, Content, List, ListItem } from "./styles";

type ItemListType = {
  description: string;
  value: number;
};

type BoxResumeType = {
  list: ItemListType[];
  title: string;
};

const BoxResume: React.FC<BoxResumeType> = ({ list, title }) => {
  const [expand, setExpand] = React.useState(false);

  return (
    <Container>
      <Header>
        <Typography variant="h6">{title}</Typography>
      </Header>
      <Content>
        <List>
          <Collapse in={expand} timeout="auto" collapsedHeight="170px">
            {list
              .sort((a, b) => b.value - a.value)
              .map((item) => (
                <ListItem>
                  <Typography variant="body1">{item.description}</Typography>
                  <Typography variant="body1">
                    {item.value.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Typography>
                </ListItem>
              ))}
          </Collapse>
        </List>
        {list.length > 5 && !expand && (
          <Button
            onClick={() => setExpand(true)}
            variant="text"
            color="primary"
          >
            Ver todos
          </Button>
        )}

        {!!expand && (
          <Button
            onClick={() => setExpand(false)}
            variant="text"
            color="primary"
          >
            Ver menos
          </Button>
        )}
      </Content>
    </Container>
  );
};

export default BoxResume;
