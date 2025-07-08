import Article from '../models/Article.js';

export async function createArticle(req, res) {
  try {
    const article = await Article.create({ ...req.body, author: req.user.id });
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getArticles(req, res) {
  try {
    const { search, category } = req.query;
    const query = {};
    if (search) query.title = { $regex: search, $options: 'i' };
    if (category) query.category = category;
    const articles = await Article.find(query).sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateArticle(req, res) {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deleteArticle(req, res) {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}