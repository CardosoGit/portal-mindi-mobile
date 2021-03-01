import { Order, OrderItem } from "Types/Order";

export default function getListByCategories(orders: Order[]) {
  const allProducts = orders
    .flatMap((order) => order.itens)
    .map((item) => ({
      category: item.productDescription.split("-")[0].trim(),
      price: item.price,
    }))
    .reduce((acuml: any, item) => {
      return {
        ...acuml,
        [item.category]: acuml[item.category]
          ? {
              description: `${item.category} (${acuml[item.category].qtd + 1})`,
              value: acuml[item.category].value + item.price,
              qtd: acuml[item.category].qtd + 1,
            }
          : {
              description: item.category + " (1)",
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
