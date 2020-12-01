import React, { Fragment } from "react";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { View } from "Theme";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Order } from "Types/Order";

// import { Container } from './styles';

type ProductViewType = {
  data: Order;
};

const ProductsView: React.FC<ProductViewType> = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();
  const searchParamValue = new URLSearchParams(search).get("searchParamName");

  return (
    <View>
      <List>
        {data.itens.map((item) => (
          <ListItem divider>
            <ListItemText
              primary={`${item.qtd}x ${
                item.productDescription
              } - ${item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}`}
              secondary={
                <ul>
                  {item.groups.map((group) =>
                    group.map((group, idx) => {
                      if (idx === 0) {
                        return (
                          <Fragment>
                            <b style={{ marginLeft: "-20px" }}>
                              {group.group}:
                            </b>
                            <li>{group.printDescription.trim()}</li>
                          </Fragment>
                        );
                      } else {
                        return <li>{group.printDescription}</li>;
                      }
                    })
                  )}
                  {item.note && (
                    <b style={{ marginLeft: "-20px" }}>
                      Observação: {item.note}
                    </b>
                  )}
                </ul>
              }
            />
          </ListItem>
        ))}
      </List>
    </View>
  );
};

export default ProductsView;
