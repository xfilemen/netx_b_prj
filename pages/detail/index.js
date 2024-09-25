import styles from '/pages/styles/detail.module.css';
import Header from '/components/header';
import Content from '/components/content/regReqList.js';
import Footer from '/components/footer';

export default function DetailPage() {
  return (
    <div className={styles.container}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}