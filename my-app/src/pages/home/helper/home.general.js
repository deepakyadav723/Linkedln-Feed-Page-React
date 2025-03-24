import _filter from "lodash/filter";
import _orderBy from "lodash/orderBy";
import _sampleSize from "lodash/sampleSize";
import { images } from "../../../data";

const parsePostDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const parseInputDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const getSortedPosts = (sortOrder, posts) => {
  return _orderBy([...posts], (post) => parsePostDate(post.date), [sortOrder]);
};

export const getFilteredPosts = (startDate, endDate, posts) => {
  return _filter(posts, (post) => {
    const postDate = parsePostDate(post.date);
    const StartDate = parseInputDate(startDate);
    const EndDate = parseInputDate(endDate);
    return postDate >= StartDate && postDate <= EndDate;
  });
};

export const generateRandomKey = () => {
  return Math.random() * 10 + new Date().toLocaleDateString();
};

export const getRandomImages = () => _sampleSize(images, 2);
