import React from "react";
import { format } from "date-fns";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { View } from "Theme";

import { Container, Divider, Pedido, Note, PrintRow } from "./styles";
import { Order } from "Types/Order";
import PrintQuestion from "./PrintQuestion";
import { GroupSharp } from "@material-ui/icons";
import { getPaymentMethod } from "Utils/indes";

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

    const haveAdress = !!order.address?.number;

    return (
      <Container>
        <View ref={ref}>
          <PrintRow horizontalCenter>
            <Pedido>Pedido</Pedido>
          </PrintRow>
          <Divider />
          <PrintRow>
            <span>{format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}</span>
          </PrintRow>
          <PrintRow spaceBetween>
            <span>{order.identify.name}</span>
            <span>{order.identify.phone}</span>
          </PrintRow>
          <Divider />
          {haveAdress && (
            <PrintRow>
              <span>{`Endereço: ${order.address?.publicPlace}, ${
                order.address?.number
              }, ${order.address?.neighborhood}. ${
                order.address?.adjunct ? order.address?.adjunct + "- " : ""
              }${order.address?.landmark || ""}`}</span>
            </PrintRow>
          )}
          <Divider />
          {order.itens.map((item) => (
            <React.Fragment>
              <PrintRow spaceBetween>
                <span>{item.productDescription}</span>
                <span>
                  {item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </PrintRow>
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
          <PrintRow spaceBetween>
            <span>Total de produtos:</span>
            <span>
              {order.totalProducts.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </PrintRow>
          {haveAdress && (
            <PrintRow spaceBetween>
              <span>Taxa de entrega:</span>
              <span>
                {order.deliveryFee === 0
                  ? "Grátis"
                  : order.deliveryFee?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
              </span>
            </PrintRow>
          )}
          <PrintRow spaceBetween>
            <span>Total:</span>
            <span>
              {order.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </PrintRow>
          <Divider />
          {haveAdress && (
            <PrintRow>
              Pagamento com{" "}
              {getPaymentMethod(order.payment?.paymentMethod as string)}
            </PrintRow>
          )}
          {haveAdress && order.payment?.change && (
            <PrintRow>
              Troco para{" "}
              {order.payment.change.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </PrintRow>
          )}
          {order.note && <PrintRow>Obs: {order.note}</PrintRow>}
        </View>
      </Container>
    );
  }
);

export default PrintView;
