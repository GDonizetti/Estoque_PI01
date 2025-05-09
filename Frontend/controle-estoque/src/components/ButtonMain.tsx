import "./ButtonMain.css";

type Props = {
  text: string;
};

const ButtonMain = ({ text }: Props) => {
  return <button className="button-main">{text}</button>;
};

export default ButtonMain;
