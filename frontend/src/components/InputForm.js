import { useState } from "react";
import axios from "axios";

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
    <form>
      <div>
        <label htmlFor="text-input">Text:</label>
        <textarea
          id="text-input"
          value={inputText}
          onChange={handleTextChange}
        ></textarea>
      </div>
      <button type="button" onClick={handleSubmitText}>
        Summarize Text
      </button>
      <div>
        <label htmlFor="url-input">URL:</label>
        <input
          type="text"
          id="url-input"
          value={inputUrl}
          onChange={handleUrlChange}
        />
      </div>
      <button type="button" onClick={handleSubmitUrl}>
        Summarize URL
      </button>
    </form>
  );
};

export default InputForm;
