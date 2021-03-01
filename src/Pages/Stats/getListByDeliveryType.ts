import { Order, OrderItem } from "Types/Order";

export default function getListByDeliveryType(orders: Order[]) {
  const allProducts = orders
    .map((order) => ({
      deliveryType: order.payment ? "Delivery" : "Retirada",
      price: order.total,
    }))
    .reduce((acuml: any, item) => {
      return {
        ...acuml,
        [item.deliveryType]: acuml[item.deliveryType]
          ? {
              description: `${item.deliveryType} (${
                acuml[item.deliveryType].qtd + 1
              })`,
              value: acuml[item.deliveryType].value + item.price,
              qtd: acuml[item.deliveryType].qtd + 1,
            }
          : {
              description: item.deliveryType + " (1)",
              value: item.price,
              qtd: 1,
            },
      };
    }, {});
  return Object.values(allProducts).map((item: any) => ({
    description: item.description,
    value: item.value,
  }));
}
