const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}]
    })

    if(!categoryData){
      res.status(404).json({message: 'No Category was found matching that Id'});
    }
  
    res.status(200).json(categoryData);

  } catch (err) {
  res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const create = await Category.create({
      category_name: `${req.body.name}`,
    });
    res
      .status(200)
      .json({ msg: `Added new Category ${req.body.name}`, response: create });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const update = await Category.update(
      { category_name: req.body.name },
      { where: { id: req.params.id } }
    );
    res.status(200).json({
      msg: `Updated Category ID ${req.params.id}, It is now ${req.body.name}`,
      response: update,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

 try {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
  });

  // If ID does not exist in db, display error
  if(!categoryData) {
   return res.status(404).json({ message: "Category does not exist, check ID entry." });
  } else {
    res.status(200).json({
      message: "Category sucessfully deleted",
      categoryData
    });
  };
 } catch (err) {
   res.status(500).json(err);
 }
});


module.exports = router;
