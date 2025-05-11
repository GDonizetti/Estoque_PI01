import "./ButtonMain.css";

type Props = {
  text: string;
  onClick: () => void;
};

const ButtonMain = ({ text, onClick }: Props) => {
  return (
    <button className="button-main button-semibold" onClick={() => onClick()}>
      {text}
    </button>
  );
};

export default ButtonMain;
