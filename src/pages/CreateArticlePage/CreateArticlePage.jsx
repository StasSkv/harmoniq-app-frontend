import s from './CreateArticlePage.module.css';
import { Container } from '../../components/Container/Container';
import { AddArticleForm } from '../../components/AddArticleForm/AddArticleForm.jsx';

export const CreateArticlePage = () => {
  return (
    <section className={s.createArticlePage}>
      <Container className={s.container}>
        <h2 className={s.title}>Create an article</h2>
        <AddArticleForm />
      </Container>
    </section>
  );
};
