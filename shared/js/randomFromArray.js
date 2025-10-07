export default (array, count = 1) => {
  if (count === 1) {
    return array[Math.floor(Math.random() * array.length)];
  } else {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(array[Math.floor(Math.random() * array.length)]);
    }
    return result;
  }
};
