import ReactPaginate from 'react-paginate';
import s from './Pagination.module.css';

export const Pagination = ({ currentPage = 1, totalItems, itemsPerPage = 20, onPageChange }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    onPageChange(selectedPage);
  };

  if (pageCount <= 1) return null;

  return (
    <div className={s.paginationWrapper}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 12L10 8L6 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        previousLabel={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={1} // Показує кількість сторінок навколо поточної
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={currentPage - 1}
        renderOnZeroPageCount={null}
        containerClassName={s.pagination}
        pageClassName={s.pageItem}
        pageLinkClassName={s.pageLink}
        previousClassName={s.previousItem}
        previousLinkClassName={s.previousLink}
        nextClassName={s.nextItem}
        nextLinkClassName={s.nextLink}
        activeClassName={s.activePage}
        disabledClassName={s.disabled}
        breakClassName={s.breakItem}
        breakLinkClassName={s.breakLink}
      />
    </div>
  );
};
