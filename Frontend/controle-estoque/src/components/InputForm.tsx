import "./InputForm.css";

type Props = {
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const InputForm = ({ type, placeholder, onChange }: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="input-form"
    />
  );
};

export default InputForm;
