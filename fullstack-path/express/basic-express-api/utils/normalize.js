const normalize = (key, value) => {
  return String(key).toLowerCase() === String(value).toLowerCase();
};

export default normalize;
