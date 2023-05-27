import React, { useEffect, useRef, useCallback } from 'react';
import ToDoItem from './TodoItem';
import Sortable from 'sortablejs';
import "./TodoList.css";

const ToDoList = ({ todoList, setTodoList}) => {
  const sortableRef = useRef(null);
  const debouncedUpdateOrder = useRef(null);

  const getTodo = useCallback(async () => {
    try {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'KDT5_nREmPe9B',
            'username': 'KDT5_YangJunYong',
          },
        }
      );
      const json = await res.json();
      setTodoList(json);
    } catch (error) {
      console.error(error);
    }
  }, [setTodoList]);

  const deleteTodo = async (id) => {
    try {
      await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'KDT5_nREmPe9B',
            'username': 'KDT5_YangJunYong',
          },
        }
      );
      setTodoList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCompletedTodos = async () => {
    try {
      const completedIds = todoList
        .filter((item) => item.done)
        .map((item) => item.id);
      await Promise.all(
        completedIds.map((id) =>
          fetch(
            `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'apikey': 'KDT5_nREmPe9B',
                'username': 'KDT5_YangJunYong',
              },
            }
          )
        )
      );
      setTodoList((prevList) => prevList.filter((item) => !item.done));
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      const res = await fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'KDT5_nREmPe9B',
            'username': 'KDT5_YangJunYong',
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (res.ok) {
        const updatedList = todoList.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        );
        setTodoList(updatedList);
      } else {
        console.error(res.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodo();
  }, [getTodo, setTodoList]);


  const debouncedUpdateTodoOrder = useCallback(
    async (updatedOrder) => {
      try {
        await fetch(
          'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'apikey': 'KDT5_nREmPe9B',
              'username': 'KDT5_YangJunYong',
            },
            body: JSON.stringify({
              todoIds: updatedOrder,
            }),
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  );

  useEffect(() => {
    if (sortableRef.current) {
      const sortable = new Sortable(sortableRef.current, {
        animation: 2000,
        onEnd: ({ oldIndex, newIndex }) => {
          setTodoList((prevList) => {
            const updatedList = [...prevList];
            const [movedItem] = updatedList.splice(oldIndex, 1);
            updatedList.splice(newIndex, 0, movedItem);

            clearTimeout(debouncedUpdateOrder.current);

            debouncedUpdateOrder.current = setTimeout(() => {
              const updatedOrder = updatedList.map((item) => item.id);
              debouncedUpdateTodoOrder(updatedOrder);
            }, 700);

            return updatedList;
          });
        },
      });

      sortable.option("onMove", function (evt) {
        const item = evt.dragged;
        item.classList.add("sortable-dragging");
      });

      sortable.option("onUnchoose", function (evt) {
        const item = evt.item;
        item.classList.remove("sortable-dragging");
      });


      return () => {
        sortable.destroy();
      };
    }
  }, [sortableRef.current, debouncedUpdateTodoOrder, setTodoList]);


  const completedList = todoList.filter((todoItem) => todoItem.done);
  const incompleteList = todoList.filter((todoItem) => !todoItem.done);

  return (
    <div class="todo-list-container">
      <p class="todo-title">진행 중..</p>
      <ul ref={sortableRef} class="todo-list">
        {incompleteList.length > 0 ? (
          incompleteList.map((todoItem) => (
            <ToDoItem
              key={todoItem.id}
              todoItem={todoItem}
              setTodoList={setTodoList}
              handleDelete={deleteTodo}
              handleUpdate={updateTodo}
              todoList={todoList}
            />
          ))
        ) : (
          <li>
            {completedList.length > 0 ? (
              <span>오늘의 할 일 끝!</span>
            ) : (
              <span>할 일을 등록하세요.</span>
            )}
          </li>
        )}
      </ul>
      {completedList.length > 0 && (
        <>
          <p className="todo-title">진행 완료</p>
          <ul className="todo-list">
            {completedList.map((todoItem) => (
              <ToDoItem
                key={todoItem.id}
                todoItem={todoItem}
                setTodoList={setTodoList}
                handleDelete={deleteTodo}
                handleUpdate={updateTodo}
                todoList={todoList}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ToDoList;
