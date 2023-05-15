export const sortByPrice = (type, items) => {
  if (type === "acc")
    return items?.map((item) => item?.price).sort((a, b) => a.price - b.price);
  if (type === "dec")
    return items?.map((item) => item?.price).sort((a, b) => b.price - a.price);
};

export const getColor = (items) => items?.map((item) => item.color);
