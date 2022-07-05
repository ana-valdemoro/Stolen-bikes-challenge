import boom from "@hapi/boom";
import stolenBikeService from "./stolenBike.service";

export async function loadStolenBike(req, res, next) {
  const { stolenBikeId } = req.params;
  let stolenBike;

  if (!stolenBikeId) {
    return next(boom.badData("StolenBikeId is required"));
  }

  try {
    stolenBike = await stolenBikeService.getByID(stolenBikeId);
  } catch (error) {
    return next(boom.badRequest("Cannot look in stolenBike collection"));
  }

  if (!stolenBike) return next(boom.notFound("StolenBike not found"));
  res.locals.stolenBike = stolenBike;

  next();
}
