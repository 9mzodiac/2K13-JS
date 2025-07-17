const getKeyByValue = (object: any, value: any): any => {
  return Object.keys(object).find((key) => object[key] === value);
};

export { getKeyByValue };
