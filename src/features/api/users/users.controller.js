const asyncFunction = async () => {
  throw new Error("La promesa no esta resuelta");
};

const listUsers = async (req, res, next) => {
  //   try {
  //     await asyncFunction();
  //   } catch (error) {
  //     next(error);
  //     return;
  //   }

  return res.send({ msg: "ANA" });
};

export { listUsers };
