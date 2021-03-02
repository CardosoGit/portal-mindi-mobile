import { Order, OrderItem } from "Types/Order";

export default function getListByPaymentMethod(orders: Order[]) {
  const allProducts = orders
    .filter((order) => order.payment)
    .map((order) => ({
      paymentMethod: translateMethod(order.payment?.paymentMethod as string),
      price: order.total,
    }))
    .reduce((acuml: any, item) => {
      return {
        ...acuml,
        [item.paymentMethod]: acuml[item.paymentMethod]
          ? {
              description: `${item.paymentMethod} (${
                acuml[item.paymentMethod].qtd + 1
              })`,
              value: acuml[item.paymentMethod].value + item.price,
              qtd: acuml[item.paymentMethod].qtd + 1,
            }
          : {
              description: item.paymentMethod + " (1)",
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

const translateMethod = (method: string): string => {
  switch (method) {
    case "cash":
      return "Dinheiro";
    case "card":
      return "Cartão";
    default:
      return "nenhum";
  }
};
