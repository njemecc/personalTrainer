import "./globals.css";

import styles from "./surveyLayout.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className={styles["survey-layout-wrapper"]}>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
