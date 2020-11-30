import React from "react";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { View } from "Theme";
import { List, ListItem, ListItemText } from "@material-ui/core";

// import { Container } from './styles';

const ProductsView: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();
  const searchParamValue = new URLSearchParams(search).get("searchParamName");

  return (
    <View>
      <List>
        <ListItem divider>
          <ListItemText
            primary="1x Açai 200 ML - R$30,00"
            secondary={
              <ul>
                <li>sabor 1</li>
                <li>sabor 2</li>
              </ul>
            }
          />
        </ListItem>
        <ListItem divider>
          <ListItemText primary="2x Açai 300ML" />
        </ListItem>
      </List>
    </View>
  );
};

export default ProductsView;
