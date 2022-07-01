import boom from "@hapi/boom";

const createStolenBike = async (req, res, next) => {
  const { body } = req;
  console.log(body);

  return next(boom.badData("Ha petado"));
  // return res.status(201).json({ msg: "Todo guay" });
};

export { createStolenBike };
