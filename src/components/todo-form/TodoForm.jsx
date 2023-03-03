import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authActionTypes } from "../../store/auth/authReducer";
import { todoActionTypes } from "../../store/todo/todoReducer";
import TodoList from "../todo-list/TodoList";

const TodoForm = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const todo = useSelector((state) => state.todo);

  const changeInputHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: todoActionTypes.ADD_TODO, payload: value });
    setValue("");
  };

  const removeAllTodo = () => {
    dispatch({ type: todoActionTypes.DELETE_ALL_TODO });
  };

  const logoutHandler = () => {
    dispatch({ type: authActionTypes.LOGOUT });
    dispatch({ type: todoActionTypes.DELETE_ALL_TODO });
    navigate("/login");
  };

  console.log(todo.todo);

  return (
    <Container>
      <h1 style={{ color: " #4f005f" }}>TodoList</h1>
      <StyleDiv>
        <Input type="text" value={value} onChange={changeInputHandler} />
        <Button onClick={logoutHandler}>logout</Button>
        <Button onClick={submitHandler} disabled={!value}>
          Add
        </Button>
        <Button onClick={removeAllTodo}>deleteA</Button>
      </StyleDiv>
      <StyledUl>
        {todo.todos.map((item) => (
          <TodoList key={item.id} todo={item} />
        ))}
      </StyledUl>
    </Container>
  );
};

export default TodoForm;

const Container = styled.div`
  text-align: center;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: grid;
  gap: 1rem;
  padding: 0;
  width: 400px;
  height: auto;
  border: 2px solid purple;
  margin-left: 38%;
color: white;

`;
const StyleDiv = styled.div`
  margin-top: 25px;
`

const Input = styled.input`
  /* border-radius: 12px;
 border: 2px solid purple;
 height: 22px;
 width: 200px; */
  font: inherit;
  padding: 0.35rem 0.35rem;
  border-radius: 61px;
  border: 2px solid #4f005f;
  height: 20px;
  &:focus {
    outline: none;
    border-color: C;
    background: #b0a4b2;
  }
`;


const Button = styled.button`
  border-radius: 12px;
  border: 1px solid #4f005f;
  background: #4f005f;
  color: white;
  height: 32px;
  width: 70px;
  cursor: pointer;
  font: inherit;

  font-size: 1.05rem;
`;