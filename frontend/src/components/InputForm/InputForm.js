import { useState } from "react";
import axios from "axios";
import styles from "./InputForm.module.css";

const InputForm = ({ setSummary }) => {
  const NLPBackend = process.env.REACT_APP_NLP_BACKEND;
  const [inputText, setInputText] = useState("");

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmitText = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(NLPBackend, { article: inputText });
      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles["form-container"]}>
      <div className={styles["label-container"]}>
        <label htmlFor="text-input" className={styles.label}>
          Text:
        </label>
        <textarea
          id="text-input"
          value={inputText}
          onChange={handleTextChange}
          className={styles.textarea}
        ></textarea>
      </div>
      <button
        type="button"
        onClick={handleSubmitText}
        className={styles.button}
      >
        Summarize Text
      </button>
    </form>
  );
};

export default InputForm;
