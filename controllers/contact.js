
const {Contact} = require('../models/contact')

const { HttpError, ctrl } = require("../helpers");

const getAll =  async (req, res) => {
  const {_id: owner} = req.user
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit //pagination
  const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
  res.json(result);
};

const add = async (req, res) => {
  const {_id: owner} = req.user
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrl(getAll),
  getById: ctrl(getById),
  add: ctrl(add),
  remove: ctrl(remove),
  updateContact: ctrl(updateContact),
  updateFavorite: ctrl(updateFavorite),
};