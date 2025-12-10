import styles from "./TrainerCard.module.css";

//icons
import { SlSocialInstagram } from "react-icons/sl";

const TrainerCard = () => {
  return (
    <div className={`${styles.item} text-center duration-1000`}>
      <img src="/assets/images/uspravno.jpg" />
      <div className={styles.inner}>
        <div className={`${styles.info} bg-primary`}>
          <h4>Djura Blažu</h4>
          <p>Personalni Trener</p>
          <div className={styles.links}>
            <a href="https://www.facebook.com/blazu.djura">
              <img src="/assets/icons/linkedin.svg" />
            </a>
            <a href="https://www.instagram.com/d_djusi.trener/">
              <img src="/assets/icons/instagram.svg" />
            </a>
            <a href="https://www.facebook.com/blazu.djura">
              <img src="/assets/icons/whatsapp.svg" />
            </a>
            <a href="https://www.facebook.com/blazu.djura">
              <img src="/assets/icons/facebook.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
