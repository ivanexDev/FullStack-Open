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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
