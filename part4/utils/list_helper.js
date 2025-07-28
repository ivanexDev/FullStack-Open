const lodash = require("lodash");

const dummy = (blogs) => {
  // ...
  return 1;
};

const totalLikes = (blogs) => {
  return blogs
    .map((blog) => blog.likes)
    .reduce((acc, cur) => {
      return acc + cur;
    });

  if (blogs.length === 1) return blogs[0].likes;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  const { title, author, likes } = blogs.reduce((max, current) => {
    return max.likes < current.likes ? current : max;
  });

  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  const grouped = lodash.countBy(blogs, "author");
  // console.log(grouped)

  const [author, count] = lodash.maxBy(
    Object.entries(grouped),
    ([, count]) => count
  );

  return { author, blogs: count };
};

const mostLikes = (blogs) => {
  const grouped = lodash.groupBy(blogs, "author");

  const result = lodash.map(grouped, (blog, author) => ({
    author,
    likes: lodash.sumBy(blog, "likes"),
  }));

  return lodash.maxBy(result, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
