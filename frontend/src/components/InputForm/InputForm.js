import { useState } from "react";
import axios from "axios";
import styles from "./InputForm.module.css";

const InputForm = ({ setSummary }) => {
  const NLPBlackbox = `${process.env.NLP_BLACKBOX}`;
  const [inputText, setInputText] = useState("");
  const [inputUrl, setInputUrl] = useState("");

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleUrlChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleSubmitText = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(NLPBlackbox, {
        text: inputText,
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitUrl = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(NLPBlackbox, {
        url: inputUrl,
      });
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
      <div className={styles["label-container"]}>
        <label htmlFor="url-input" className={styles.label}>
          URL:
        </label>
        <input
          type="text"
          id="url-input"
          value={inputUrl}
          onChange={handleUrlChange}
          className={styles.input}
        />
      </div>
      <button type="button" onClick={handleSubmitUrl} className={styles.button}>
        Summarize URL
      </button>
    </form>
  );
};

export default InputForm;
