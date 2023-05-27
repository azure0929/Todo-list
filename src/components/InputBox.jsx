import React, { useState, useRef } from 'react';
import "./InputBox.css";

const InputBox = ({ setTodoList, isLoading}) => {
  const [text, setText] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const inputRef = useRef(null);
  const onChange = (e) => {
    setText(e.target.value);
  };
  const postTodo = async () => {
    if (isPosting) {
      return;
    }
    if (text.trim() === '') {
      return;
    }
    setIsPosting(true);
    try {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'apikey': 'KDT5_nREmPe9B',
            'username': 'KDT5_YangJunYong'
          },
          body: JSON.stringify({
            title: text,
            checked: false,
          }),
        }
      );

      const json = await res.json();
      setText('');
      inputRef.current.focus();
      setTodoList((prevList) => [json, ...prevList]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      postTodo();
    }
  };

  return (
    <div className="content-box">
      <input
        type="text"
        value={text}
        placeholder="할 일을 작성해주세요."
        className="content-detail"
        onChange={onChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <button className="submit" onClick={postTodo} type="submit" disabled={isLoading}>
        <span><i className="fa-light fa-plus"></i></span>
      </button>
    </div>
  );
};

export default InputBox;
