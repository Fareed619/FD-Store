import { isValidObjectId } from "mongoose";
function checkId(req, res, next) {
  if (!isValidObjectId(req.params.productId)) {
    res.status(404);
    throw new Error(`Invalid Object of: ${req.params.productId}`);
  } else {
    next();
  }
}
export default checkId;
