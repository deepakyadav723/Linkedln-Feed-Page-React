import { useEffect } from "react";
import _filter from "lodash/filter";

export function useWindowListener(event, callback) {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
}

export function getSortedPosts(sortOrder, posts) {
  const sortedPosts = [...posts];
  return sortedPosts.sort((post1, post2) => {
    const dateString1 = post1.date;
    const [day1, month1, year1] = dateString1.split("/").map(Number);
    const date1 = new Date(year1, month1 - 1, day1);

    const dateString2 = post2.date;
    const [day2, month2, year2] = dateString2.split("/").map(Number);
    const date2 = new Date(year2, month2 - 1, day2);

    return sortOrder === "ASC" ? date1 - date2 : date2 - date1;
  });
}

export function getFilteredPosts(startDate, endDate, posts) {
  return _filter(posts, (item) => {
    const itemDateString = item.date;
    const [day1, month1, year1] = itemDateString.split("/").map(Number);
    const itemDate = new Date(year1, month1 - 1, day1);

    const [year2, month2, day2] = startDate.split("-").map(Number);
    const StartDate = new Date(year2, month2 - 1, day2);

    const [year3, month3, day3] = endDate.split("-").map(Number);
    const EndDate = new Date(year3, month3 - 1, day3);

    return itemDate >= StartDate && itemDate <= EndDate;
  });
}
