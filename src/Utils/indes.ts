export const getPaymentMethod = (sPaymentMethod: string) => {
  // eslint-disable-next-line default-case
  switch (sPaymentMethod) {
    case "card":
      return "Cartão";
    case "cash":
      return "Dinheiro";
    case "transference":
      return "Transferência bancária";
    case "boleto":
      return "Boleto";
    case "pix":
      return "Pix";
    case "picpay":
      return "Picpay";
    case "aux_emergencial":
      return "Auxílio Emergencial";
  }
};
