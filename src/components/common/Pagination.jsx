import _ from "lodash";
const Pagination = (props) => {
  let totalPages = props.length / props.pageSize;
  const array = _.range(1, totalPages + 1);
  if (Math.ceil(totalPages) == 1) return null;
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {array.map((item) => (
          <li
            key={item}
            className={
              item === props.currentPage ? "page-item active" : "page-item"
            }
          >
            <a onClick={() => props.doPageChange(item)} className="page-link">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
