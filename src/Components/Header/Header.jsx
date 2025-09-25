import styles from "./Header.module.scss"
import ziregulLogo from "../../assets/Images/ziregulLogo.png"
import defaultImg from "../../assets/Images/dafaultUserImg.png"


export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      <a href="/">
        <img src={ziregulLogo} alt="" />
      </a>
      <div className={styles.langAndUserInfo}>
        <select name="" id="" className={styles.lang}>
          <option value="az" className={styles.az}>Az</option>
          <option value="en" className={styles.en}>En</option>
          <option value="ru" className={styles.ru}>Ru</option>
              </select>
              <div className={styles.userInfo}>
                  <img src={defaultImg} alt="" className={styles.userImg} />
                  <div className={styles.userNamePosition}>
                      <span className={styles.userName}>Firuz Memmedov</span>
                      <span className={styles.userPosition}>Super Admin</span>
                  </div>
              </div>
      </div>
    </div>
  );
}
