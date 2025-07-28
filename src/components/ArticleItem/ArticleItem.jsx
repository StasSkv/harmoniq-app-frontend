import s from './ArticleItem.module.css';

const ArticleItem = ({ img, title, article }) => {
  return (
    <div className={s.article}>
      <img src={img} alt="Article" className={s.image} />
      <div>
        <span className={s.authorName}>AuthorPlaceholder</span>
        <h3 className={s.title}>{title}</h3>
        <p className={s.articlePreview}>{article}</p>
      </div>
      <div className={s.buttons}>
        <a className={s.learnLink} href="">
          Learn more
        </a>
        <button className={s.addBtn} type="button">
          <svg className={s.addIcon} width="24px" height="24px">
            <use href="/src/assets/icons/sprite.svg#icon-bookmark-alternative"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default ArticleItem;
