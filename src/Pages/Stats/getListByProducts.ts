import { Order, OrderItem } from "Types/Order";

export default function getListByProducts(orders: Order[]) {
  const allProducts = orders
    .flatMap((order) => order.itens)
    .map((item) => ({
      product: item.productDescription.split("-").slice(1).join(" "),
      price: item.price,
    }))
    .reduce((acuml: any, item) => {
      return {
        ...acuml,
        [item.product]: acuml[item.product]
          ? {
              description: `${item.product} (${acuml[item.product].qtd + 1})`,
              value: acuml[item.product].value + item.price,
              qtd: acuml[item.product].qtd + 1,
            }
          : {
              description: item.product + " (1)",
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
