function formatGBP(pence) {
  const formattedPounds = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  const convertedPence = pence / 100;
  return formattedPounds.format(convertedPence);
}

export default formatGBP;
