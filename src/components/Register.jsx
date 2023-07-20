import React, { useContext, useState } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { MyContext } from "../contexts/MyContext";


function Register() {
  const { toggleNav, registerUser } = useContext(MyContext);
  const initialState = {
    userInfo: {
      name: "",
      user: "",
      password: "",
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);

  // On Submit the Registration Form
  const submitForm = async (event) => {
    event.preventDefault();
    const data = await registerUser(state.userInfo);
    if (data.success) {
      setState({
        ...initialState,
        successMsg: data.message,
      });
    } else {
      setState({
        ...state,
        successMsg: "",
        errorMsg: data.message,
      });
    }
  };

  // On change the Input Value (name, email, password)
  const onChangeValue = (e) => {
    setState({
      ...state,
      userInfo: {
        ...state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Show Message on Success or Error
  let successMsg = "";
  let errorMsg = "";
  if (state.errorMsg) {
    errorMsg = <div className="error-msg">{state.errorMsg}</div>;
  }
  if (state.successMsg) {
    successMsg = <div className="success-msg">{state.successMsg}</div>;
  }

  return (
    <Card
    title="Cadastro de Usuário"
    bordered={false}
    style={{
      width: 350,
    }}
  >
      
         
          <Form onFinish={submitForm} layout="vertical">
            <Form.Item label="Nome">
              <Input
                name="name"
                required
                value={state.userInfo.name}
                onChange={onChangeValue}
                placeholder="Digite seu nome completo"
              />
            </Form.Item>
            <Form.Item label="Usuário">
              <Input
                name="user"
                required
                type="user"
                value={state.userInfo.email}
                onChange={onChangeValue}
                placeholder="Digite seu usuário"
              />
            </Form.Item>
            <Form.Item label="Senha">
              <Input.Password
                name="password"
                required
                type="password"
                value={state.userInfo.password}
                onChange={onChangeValue}
                placeholder="Digite sua senha"
              />
            </Form.Item>
            {errorMsg}
            {successMsg}
            <div>
              <Button type="primary" htmlType="submit">
                Cadastrar
              </Button>
            </div>
          </Form>
          <div>
            <Button variant="outlined" onClick={toggleNav}>Entrar</Button>
          </div>
    
    </Card>
  );
}

export default Register;
