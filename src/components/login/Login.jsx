import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authActionTypes } from "../../store/auth/authReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  console.log(isAuthorized);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (name) => {
    return (e) => {
      setFormState((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formState.email.includes("@") && formState.password.length > 6) {
      dispatch({
        type: authActionTypes.LOGIN,
        email: formState.email,
        password: formState.password,
      });
      navigate("/todos");
    }
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <ContainerInput>
          <Label htmlFor="email">Email:</Label>
          <StyleInput
            type="email"
            id="email"
            onChange={inputChangeHandler("email")}
            value={formState.email}
          />
        </ContainerInput>
        <ContainerInput>
          <Label htmlFor="password">Password:</Label>
          <PasswordInput
            type="password"
            id="password"
            onChange={inputChangeHandler("password")}
            value={formState.password}
          />
        </ContainerInput>
        <Button>Login</Button>
      </Form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 7);
  border-radius: 13px;
  width: 70%;
  max-width: 40rem;
  margin-top: 9rem;
  padding: 2rem;
  margin: 7rem auto;
  text-align: center;
`;

const ContainerInput = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: stretch;
  flex-direction: column;
`;

const StyleInput = styled.input`
    font: inherit;
  padding: 0.35rem 0.35rem;
  border-radius: 6px;
  border: 2px solid #ccc;
  height: 30px;
  &:focus {
    outline: none;
    border-color: #4f005f;
    background: #f6dbfc;
  }
`;
const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  color: #464646;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
width: 180px;
margin-left: 35%;
  font: inherit;
  border: 1px solid #4f005f;
  background: #4f005f;
  color: white;
  padding: 0.75rem 3.5rem;
  cursor: pointer;
  font-size: 1.15rem;
  border-radius: 30px;
  &:hover,
  &:active {
    background: #741188;
    border-color: #741188;
  }
  &:disabled,
  &:focus:disabled,
  &:hover:disabled,
  &:active:disabled {
    background: #ccc;
    border-color: #ccc;
    color: #666666;
    cursor: not-allowed;
  }
`;

const PasswordInput = styled.input`
  font: inherit;
  padding: 0.35rem 0.35rem;
  border-radius: 6px;
  border: 2px solid #ccc;
  height: 30px;
  &:focus {
    outline: none;
    border-color: #4f005f;
    background: #f6dbfc;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;