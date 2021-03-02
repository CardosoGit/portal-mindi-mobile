import { Order, OrderItem } from "Types/Order";

export default function getListByCategories(orders: Order[]) {
  const allProducts = orders
    .flatMap((order) => order.itens)
    .map((item) => ({
      category: item.productDescription.split("-")[0].trim(),
      price: item.price,
      qtd: item.qtd,
    }))
    .reduce((acuml: any, item) => {
      return {
        ...acuml,
        [item.category]: acuml[item.category]
          ? {
              description: `${item.category} (${
                acuml[item.category].qtd + item.qtd
              })`,
              value: acuml[item.category].value + item.price,
              qtd: acuml[item.category].qtd + item.qtd,
            }
          : {
              description: item.category + ` (${item.qtd})`,
              value: item.price,
              qtd: item.qtd,
            },
      };
    }, {});
  return Object.values(allProducts).map((item: any) => ({
    description: item.description,
    value: item.value,
  }));
}
