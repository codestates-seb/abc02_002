import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/components/Pagination.module.css';

const Pagination = ({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={`${styles.move} ${noPrev && styles.visible}`}>
          <Link to={`?page=${start - 1}`}>이전</Link>
        </li>
        {[...Array(pageCount)].map((a, i) => (
          <>
            {start + i <= totalPages && (
              <li key={i}>
                <Link
                  className={`${styles.page} ${
                    currentPage === start + i && styles.active
                  }`}
                  to={`?page=${start + i}`}
                >
                  {start + i}
                </Link>
              </li>
            )}
          </>
        ))}
        <li className={`${styles.move} ${noNext && styles.visible}`}>
          <Link to={`?page=${start + pageCount}`}>다음</Link>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;