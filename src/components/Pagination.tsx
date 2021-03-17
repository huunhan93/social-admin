import { useState } from "react";

type PaginationProps = {
  onPageChanged: Function;
  totalRecords: number;
  pageSize: number;
  pageLimit: number;
};

export const Pagination = (props: PaginationProps) => {
  const { totalRecords, pageLimit, pageSize } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalRecords / pageSize);

  var startPageIndex = Math.max(currentPage - pageLimit, 1);
  var endPageIndex = Math.min(currentPage + pageLimit, totalPages);

  const range = (from: number, to: number, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }

    return range;
  };

  const pages = range(startPageIndex, endPageIndex);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    props.onPageChanged(pageNumber);
  };

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            aria-label="Previous"
            onClick={() => handleClick(currentPage - 1)}
          >
            <span aria-hidden="true">«</span>
          </button>
        </li>

        {pages.map((page, index) => {
          return (
            <li
              key={index}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => handleClick(page)}>
                {page}
              </button>
            </li>
          );
        })}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            aria-label="Next"
            onClick={() => handleClick(totalPages)}
          >
            <span aria-hidden="true">»</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
