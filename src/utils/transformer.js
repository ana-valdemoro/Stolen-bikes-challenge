export const transformObjectKeysFromCamelToUnderscore = (object) => {
  const keys = Object.keys(object);
  let result = {};

  keys.forEach((key) => {
    let newKey = camelToUnderscore(key);
    result[newKey] = object[key];
  });

  return result;
};

export const camelToUnderscore = (key) =>
  key.replace(/([A-Z])/g, "_$1").toLowerCase();

