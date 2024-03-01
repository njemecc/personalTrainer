import styles from "./TrainerCard.module.css";

//icons
import { SlSocialInstagram } from "react-icons/sl";

const TrainerCard = () => {
  return (
    <div className={`${styles.item} text-center duration-1000`}>
      <img src="/assets/images/stoji-original.jpg" />
      <div className={styles.inner}>
        <div className={`${styles.info} bg-primary`}>
          <h4>Marko Gligorijević</h4>
          <p>Personalni Trener</p>
          <div className={styles.links}>
            <a href="https://www.facebook.com/markomarerema.gligorijevic">
              <img src="/assets/icons/linkedin.svg" />
            </a>
            <a href="https://www.instagram.com/makson_g7/">
              <img src="/assets/icons/instagram.svg" />
            </a>
            <a href="#">
              <img src="/assets/icons/whatsapp.svg" />
            </a>
            <a href="https://api.whatsapp.com/send/?phone=%2B38164692950&text&type=phone_number&app_absent=0">
              <img src="/assets/icons/facebook.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
