import asyncHandler from 'express-async-handler';
import ColorSet from '../models/colorSetModel.js';

// @desc    Fetch all color sets
// @route   GET /api/colorsets
// @access  Public
const getColorSets = asyncHandler(async (req, res) => {
  const colorSets = await ColorSet.find({});
  res.json(colorSets);
});

// @desc    Fetch single color set
// @route   GET /api/colorsets/:id
// @access  Public
const getColorSetById = asyncHandler(async (req, res) => {
  const colorSet = await ColorSet.findById(req.params.id);

  if (colorSet) {
    res.json(colorSet);
  } else {
    res.status(404);
    throw new Error('Color Set not found');
  }
});

// @desc    Create a color set
// @route   POST /api/colorsets
// @access  Private/Admin
const createColorSet = asyncHandler(async (req, res) => {
    const { name, colors } = req.body;
  
    const colorSet = new ColorSet({
      name,
      colors,
      user: req.user._id,
    });
  
    const createdColorSet = await colorSet.save();
    res.status(201).json(createdColorSet);
  });
  
// @desc    Update a color set
// @route   PUT /api/colorsets/:id
// @access  Private/Admin
const updateColorSet = asyncHandler(async (req, res) => {
  const { name, colors } = req.body;

  const colorSet = await ColorSet.findById(req.params.id);

  if (colorSet) {
    colorSet.name = name;
    colorSet.colors = colors;

    const updatedColorSet = await colorSet.save();
    res.json(updatedColorSet);
  } else {
    res.status(404);
    throw new Error('Color Set not found');
  }
});

// @desc    Delete a color set
// @route   DELETE /api/colorsets/:id
// @access  Private/Admin
const deleteColorSet = asyncHandler(async (req, res) => {
  const colorSet = await ColorSet.findById(req.params.id);

  if (colorSet) {
    await colorSet.remove();
    res.json({ message: 'Color Set removed' });
  } else {
    res.status(404);
    throw new Error('Color Set not found');
  }
});

export {
  getColorSets,
  getColorSetById,
  createColorSet,
  updateColorSet,
  deleteColorSet,
};
