import styles from "./auth.module.css";

export const LoginComponent = () => {
  return (
    <div className={styles.authBox}>
      <p>Your account to get accessed to your personalised news.</p>
      <form className={styles.invisibleForm}>
        <label htmlFor="email">Email</label>
        <input className={styles.input} type="email" id="email" />
        <label htmlFor="password">Password</label>
        <input className={styles.input} type="password" id="password" />
        <button className={styles.button}>Log in</button>
      </form>
    </div>
  );
};
