import styles from '/pages/styles/footer.module.css';

export default function FooterPage() {
  return (
    <div className={styles.footer_section}>
      <div className={styles.footer_wrap}>
        <div className={styles.site_info01}>Workforce Request Manager System</div>
        <div className={styles.site_info02}>© DIWARE. All Rights Reserved.</div>
      </div>
    </div>
  );
}