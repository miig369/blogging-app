import asyncHandler from 'express-async-handler';
import Article from '../models/articleModel.js';
import fs from 'fs';
import multer from 'multer';
const uploadMiddleware = multer({ dest: 'uploads/' });

const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({})
    .populate('author', ['firstName'])
    .sort({ createdAt: -1 });

  if (articles) {
    res.status(200).json(articles);
  } else {
    res.status(404);
    throw new Error('no Article(s) available');
  }
});

const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    res.status(200).json(article);
  } else {
    res.status(404);
    throw new Error('Article could not be found');
  }
});

const addArticle = asyncHandler(
  // uploadMiddleware.single('imageUrl'),
  async (req, res) => {
    const { title, summary, content, imageUrl } = req.body;
    const date = new Date(Date.now()).toLocaleDateString();

    //image upload
    // const { originalname, path } = req.file;
    // const parts = originalname.split('.');
    // const ext = parts[parts.length - 1];
    // const newPath = path + '.' + ext;
    // fs.renameSync(path, newPath);

    const article = await Article.create({
      title,
      summary,
      content,
      imageUrl,
      author: req.user,
      datePosted: date,
    });

    if (article) {
      res.status(201).json(article);
    } else {
      res.status(400);
      throw new Error('Article could not be created');
    }
  }
);

const updateArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    article.title = req.body.title || article.title;
    article.summary = req.body.summary || article.summary;
    article.content = req.body.content || article.content;
    article.imageUrl = req.body.imageUrl || article.imageUrl;

    const updatedArticle = await article.save();

    res.json({
      _id: updatedArticle._id,
      title: updatedArticle.title,
      summary: updatedArticle.summary,
      content: updatedArticle.content,
      imageUrl: updatedArticle.imageUrl,
    });
  } else {
    res.status(401);
    throw new Error('Could not update Artilce');
  }
});

const deleteArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    await article.deleteOne();
    res.status(201).json({ message: 'Article deleted' });
  } else {
    res.status(404);
    throw new Error('Article not found');
  }
});

const getArticlesByUser = asyncHandler(async (req, res) => {
  const articles = await Article.find();

  if (articles) {
    res.status(200).json(articles);
  } else {
    res.status(404);
    throw new Error('Article could not be found');
  }
});
export {
  getArticles,
  getArticleById,
  addArticle,
  updateArticleById,
  deleteArticleById,
  getArticlesByUser,
};
