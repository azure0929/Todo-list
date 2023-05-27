import React, { useState } from 'react';
import InputBox from './components/InputBox';
import ToDoList from './components/TodoList';
import "./Home.css";

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading] = useState(false)

  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate()
  };

  return (
    <div className="today-content">
      <div className='today-content-date'>
        {isLoading && <div class="loading"></div>}
        <div className="today-content-date-detail">
          <div>{today.year}.{today.month}.{today.date}</div> 
        </div>
      </div>
      <InputBox todoList={todoList} setTodoList={setTodoList} isLoading={isLoading} />
      <ToDoList todoList={todoList} setTodoList={setTodoList} isLoading={isLoading} />
    </div>
  );
};

export default Home;
