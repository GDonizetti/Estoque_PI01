import "./Login.css";
import ButtonMain from "../components/ButtonMain";
import InputForm from "../components/InputForm";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const CustomH1 = styled.div`
  margin-bottom: 64px;
  width: 100%;
`;

const CustomInputForm = styled.div`
  margin-top: 48px;
  width: 100%;
`;

const CustomButtonMain = styled.div`
  margin-top: 112px;
  width: 100%;
`;

let username = "";
let password = "";

function Login() {
  const navigate = useNavigate();
  async function StockLogin() {
    const corpo: RequestLogin = {
      username: username,
      password: password,
    };

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corpo),
    }).then(async (res) => {
      const data = await res.json();
      localStorage.setItem("authToken", data.token);
      navigate("/StockMain");
    });
  }

  class RequestLogin {
    username: string = "";
    password: string = "";
  }

  return (
    <>
      <div className="wrapper-login">
        <div className="login-div">
          <CustomH1>
            <h1>Faça seu login</h1>
          </CustomH1>

          <InputForm
            type="text"
            onChange={(value) => (username = value)}
            placeholder="Usuário"
          />
          <CustomInputForm>
            <InputForm
              type="password"
              onChange={(value) => (password = value)}
              placeholder="Senha"
            />
          </CustomInputForm>
          <CustomButtonMain>
            <ButtonMain text="Entrar" onClick={() => StockLogin()} />
          </CustomButtonMain>
        </div>
      </div>
    </>
  );
}

export default Login;
