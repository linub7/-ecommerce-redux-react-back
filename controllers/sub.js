const Sub = require('../models/sub');
const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res, next) => {
  try {
    const { name, parent } = req.body;
    const sub = await new Sub({ name, parent, slug: slugify(name) }).save();
    res.json(sub);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create Sub Failed!');
  }
};

exports.list = async (req, res, next) => {
  try {
    const subs = await Sub.find({}).sort('-createdAt');
    res.json(subs);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.read = async (req, res, next) => {
  try {
    const sub = await Sub.findOne({ slug: req.params.slug });
    if (!sub) {
      return res.status(400).send('There is no Sub with this Name');
    }
    const products = await Product.find({ subs: sub })
      .populate('subs')
      .populate('category')
      .exec();
    res.json({
      sub,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

exports.update = async (req, res, next) => {
  const { name, parent } = req.body;
  try {
    const sub = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true, runValidators: true }
    );
    res.json(sub);
  } catch (err) {
    console.log(err);
    res.status(400).send('Sub Update Failed');
  }
};

exports.remove = async (req, res, next) => {
  try {
    const sub = await Sub.findOne({ slug: req.params.slug });
    if (!sub) {
      return res.status(400).send('There is no Sub with this Name');
    }
    await sub.remove();
    res.send('Sub Deleted!');
  } catch (err) {
    console.log(err);
    res.status(400).send('Delete Sub Failed!');
  }
};
