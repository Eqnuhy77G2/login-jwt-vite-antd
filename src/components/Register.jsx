import React, { useContext, useState } from "react";
import { Form, Input, Button, Typography, Card } from "antd";
import { MyContext } from "../contexts/MyContext";


function Register() {
  const { toggleNav, registerUser } = useContext(MyContext);
  const initialState = {
    userInfo: {
      name: "",
      sex:"",
      phone:"",
      visitor_id:"",
      event : "",
      // password: "",
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
    title="User registration"
    bordered={false}
    style={{
      width: 350,
    }}
  >
      
         
          <Form onFinish={submitForm} layout="vertical">
            <Form.Item label="Visiter_name">
              <Input
                name="Visiter_name"
                required
                value={state.userInfo.name}
                onChange={onChangeValue}
                placeholder="Enter your full name"
              />
            </Form.Item>
            <Form.Item label="Sex">
              <Input
                name="Sex"
                required
                value={state.userInfo.sex}
                onChange={onChangeValue}
                placeholder="Enter your sex"
              />
            </Form.Item>
            <Form.Item label="Phone_number">
              <Input
                name="phone"
                required
                value={state.userInfo.phone}
                onChange={onChangeValue}
                placeholder="Enter your phone number"
              />
            </Form.Item>
            <Form.Item label="Visitor_id">
              <Input
                name="visitor_id"
                required
                value={state.userInfo.visitor_id}
                onChange={onChangeValue}
                placeholder="Enter your visitor_id"
              />
            </Form.Item>
            <Form.Item label="Event">
              <Input
                name="event"
                required
                value={state.userInfo.event}
                onChange={onChangeValue}
                placeholder="Enter your event"
              />
            </Form.Item>
            {/* <Form.Item label="Password">
              <Input.Password
                name="password"
                required
                type="password"
                value={state.userInfo.password}
                onChange={onChangeValue}
                placeholder="Type your password"
              />
            </Form.Item> */}
            {errorMsg}
            {successMsg}
            <div>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
          <div>
            <Button variant="outlined" onClick={toggleNav}>Login</Button>
          </div>
    
    </Card>
  );
}

export default Register;
