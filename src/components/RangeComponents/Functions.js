export const changeClassName = (value, class1, class2, class3) => {
  const nValue = Number(value);
  if (nValue === 0) {
    return class1;
  } else if (nValue === 1) {
    return class2;
  } else if (nValue === 2) {
    return class3;
  }
}

