import styles from "./SummaryDisplay.module.css";

const SummaryDisplay = ({ summary }) => {
  return (
    <div className={styles["summary-container"]}>
      <h2 className={styles["summary-title"]}>Summary:</h2>
      <pre className={styles["summary-content"]}>{summary}</pre>
    </div>
  );
};

export default SummaryDisplay;
