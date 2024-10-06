const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll();
    res.json(categories);
} catch (err) {
    res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.json(category);
} catch (err) {
    res.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
} catch (err) {
    res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const [updated] = await Category.update(req.body, {
        where: { id: req.params.id },
    });
    if (!updated) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.json({ message: 'Category updated' });
} catch (err) {
    res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({
        where: { id: req.params.id },
    });
    if (!deleted) {
        res.status(404).json({ message: 'Category not found' });
        return;
    }
    res.json({ message: 'Category deleted' });
} catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
