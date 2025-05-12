import "./ButtonMain.css";

type Props = {
  disabled: boolean;
  text: string;
  onClick: () => void;
};

const ButtonMain = ({ disabled, text, onClick }: Props) => {
  return (
    <button
      className="button-main button-semibold"
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default ButtonMain;
