import _ from "lodash";

export function paginate(items, currentPage, pageSize) {
  let start = (currentPage - 1) * pageSize;
  let res = _.slice(items, start);
  return _.take(res, pageSize);
}
