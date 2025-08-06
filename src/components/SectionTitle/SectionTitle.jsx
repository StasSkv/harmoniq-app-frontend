import Select from 'react-select';
import s from './SectionTitle.module.css';

const SectionTitle = ({ title, filter, setFilter, total, options }) => {
  const handleChange = (selected) => {
    setFilter(selected.value);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'var(--white)',
      border: '1px solid var(--gray-light)',
      borderRadius: '4px',
      minHeight: '33px',
      height: '33px',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid var(--gray-light)',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0 8px',
      height: '33px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--gray)',
      fontSize: '16px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'var(--white)',
      borderRadius: '4px',
      marginTop: '4px',
      width: '100%',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: '4px',
      boxSizing: 'border-box',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? 'var(--green-light)'
        : state.isFocused
        ? 'var(--green)'
        : 'transparent',
      color: state.isSelected
        ? 'var(--green-darker)'
        : state.isFocused
        ? 'var(--white)'
        : 'var(--black)',
      fontWeight: state.isSelected ? 'var(--font-weight-bold)' : 'var(--font-weight-regular)',
      cursor: 'pointer',
      padding: '6px 8px',
      margin: '4px 0',
      borderRadius: '6px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '33px',
    }),
  };

  return (
    <div className={s.section_title_wrapper}>
      <h2 className={s.section_title}>{title}</h2>
      <div className={s.top_bar}>
        {typeof total === 'number' && (
          <p className={s.articles_count}>
            {total} {title}
          </p>
        )}
        <div className={s.filters}>
          <Select
            options={options}
            value={options.find((opt) => opt.value === filter)}
            onChange={handleChange}
            isSearchable={false}
            styles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;
