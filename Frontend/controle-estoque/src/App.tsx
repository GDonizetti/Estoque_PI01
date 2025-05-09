import "./App.css";
import ButtonMain from "./components/ButtonMain";
import InputForm from "./components/InputForm";

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

function App() {
  return (
    <>
      <div className="login-div">
        <CustomH1>
          <h1>Faça seu login</h1>
        </CustomH1>

        <InputForm
          type="text"
          onChange={(value) => console.log(value)}
          placeholder="Usuário"
        />
        <CustomInputForm>
          <InputForm
            type="password"
            onChange={(value) => console.log(value)}
            placeholder="Senha"
          />
        </CustomInputForm>
        <CustomButtonMain>
          <ButtonMain text="Entrar" />
        </CustomButtonMain>
      </div>
    </>
  );
}

export default App;
