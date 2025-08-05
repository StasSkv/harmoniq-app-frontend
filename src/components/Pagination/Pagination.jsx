import ReactPaginate from 'react-paginate';
import s from './Pagination.module.css';

export const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination) return null;

  const { page = 1, totalPages = 1 } = pagination;

  if (totalPages <= 1) return null;

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    onPageChange(selectedPage);
  };

  return (
    <div className={s.paginationWrapper}>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="next">
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
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="previous">
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
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        disableInitialCallback={true}
        disabledClassName={s.disabled}
        pageCount={totalPages}
        forcePage={page - 1}
        renderOnZeroPageCount={null}
        containerClassName={s.pagination}
        pageClassName={s.pageItem}
        pageLinkClassName={s.pageLink}
        previousClassName={s.previousItem}
        previousLinkClassName={s.previousLink}
        nextClassName={s.nextItem}
        nextLinkClassName={s.nextLink}
        activeClassName={s.activePage}
        breakClassName={s.breakItem}
        breakLinkClassName={s.breakLink}
        breakAriaLabels={{
          forward: 'Перейти вперед',
          backward: 'Перейти назад',
        }}
        ariaLabelBuilder={(page) => `Перейти на сторінку ${page}`}
      />
    </div>
  );
};
