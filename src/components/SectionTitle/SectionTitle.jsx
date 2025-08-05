import s from './SectionTitle.module.css';

const SectionTitle = ({ title, filter, setFilter, total }) => {
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className={s.section_title_wrapper}>
      <h2 className={s.section_title}>{title}</h2>
      <div className={s.top_bar}>
        {typeof total === 'number' && <p className={s.articles_count}>{total} articles</p>}
        <div className={s.filters}>
          <select name="filter" className={s.filter_select} value={filter} onChange={handleChange}>
            <option value="all">All</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
