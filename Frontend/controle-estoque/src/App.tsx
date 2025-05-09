import "./App.css";
import Button from "./components/Button";
import InputForm from "./components/InputForm";

function App() {
  return (
    <>
      <div className="login-div">
        <h1>Faça seu login</h1>
        <InputForm
          type="text"
          onChange={(value) => console.log(value)}
          placeholder="Usuário"
        />
        <InputForm
          type="password"
          onChange={(value) => console.log(value)}
          placeholder="Senha"
        />
        <Button text="Entrar" />
      </div>
    </>
  );
}

export default App;
