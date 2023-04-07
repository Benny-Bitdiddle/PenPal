import { useState } from "react";
import axios from "axios";
import styles from "./InputForm.module.css";
import { ClipLoader } from "react-spinners";

const InputForm = ({ setSummary }) => {
  const NLPBackend = 'http://127.0.0.1:5000/summarize';
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmitText = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(NLPBackend, { article: inputText });
      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
        disabled={isLoading}
      >
        {isLoading ? (
          <ClipLoader size={15} color={"#ffffff"} loading={isLoading} />
        ) : (
          "Summarize Text"
        )}
      </button>
    </form>
  );
};

export default InputForm;
