import React from "react";
import { format } from "date-fns";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, View } from "Theme";

import { Container, Divider, Pedido, Note } from "./styles";
import { Order } from "Types/Order";
import PrintQuestion from "./PrintQuestion";
import { GroupSharp } from "@material-ui/icons";

// const order: Order = {
//   createdAt: new Date(),
//   discountValue: 10,
//   identify: {
//     name: "João Cardoso",
//     phone: "55 991211888",
//   },
//   note: "Sem cebola",
//   total: 29,
//   totalProducts: 10,
//   payment: {
//     change: 20,
//     paymentMethod: "cash",
//   },
//   deliveryFee: 10,
//   address: {
//     neighborhood: "centro",
//     number: "29",
//     publicPlace: "rua dr. pestana",
//   },
//   itens: [],
// };

type PrintViewType = {
  order: Order;
};

const PrintView = React.forwardRef<HTMLDivElement, PrintViewType>(
  ({ order }, ref) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { url, path, isExact, params } = useRouteMatch();
    const {} = useParams();
    const { search } = useLocation();
    const searchParamValue = new URLSearchParams(search).get("searchParamName");

    return (
      <Container>
        <View ref={ref}>
          <Row horizontalCenter>
            <Pedido>Pedido</Pedido>
          </Row>
          <Divider />
          <Row>
            <span>{format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}</span>
          </Row>
          <Row spaceBetween>
            <span>{order.identify.name}</span>
            <span>{order.identify.phone}</span>
          </Row>
          <Divider />
          {order.itens.map((item) => (
            <React.Fragment>
              <Row spaceBetween>
                <span>{item.productDescription}</span>
                <span>
                  {item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </Row>
              {item.groups.map((groups) => (
                <PrintQuestion
                  title={groups[0].group}
                  itens={groups.map((group) => `${group.printDescription}`)}
                />
              ))}
              {item.note && <Note>{item.note}</Note>}
            </React.Fragment>
          ))}

          <Divider />
          <Row>
            <span>{`${order.address?.publicPlace}, ${order.address?.number}, ${order.address?.neighborhood}`}</span>
          </Row>
          <Divider />
          <Row spaceBetween>
            <span>Total de produtos:</span>
            <span>
              {order.totalProducts.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </Row>
          <Row spaceBetween>
            <span>Taxa de entrega:</span>
            <span>
              {order.deliveryFee?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </Row>
          <Row spaceBetween>
            <span>Total:</span>
            <span>
              {order.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </Row>
          {order.note && <Row>Obs: {order.note}</Row>}
        </View>
      </Container>
    );
  }
);

export default PrintView;
