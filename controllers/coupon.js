const Coupon = require('../models/coupon');

exports.create = async (req, res, next) => {
  try {
    const { name, expiry, discount } = req.body.coupon;
    const newCoupon = await new Coupon({ name, expiry, discount }).save();
    res.json(newCoupon);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.list = async (req, res, next) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: '-1' }).exec();
    res.json(coupons);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndRemove(req.params.couponId).exec();
    res.json(coupon);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
