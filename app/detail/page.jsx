import styles from '/app/styles/detail.module.css';
import Header from '/app/components/header';
import Content from '/app/reqdetail/regReqListPage.jsx';
import Footer from '/app/components/footer';

export default function DetailPage() {
  return (
    <div className={styles.container}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}