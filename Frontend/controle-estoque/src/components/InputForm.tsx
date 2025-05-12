import "./InputForm.css";

type Props = {
  type: string;
  placeholder: string;
  isInvalid: boolean;
  onChange: (value: string) => void;
};

const InputForm = ({ type, placeholder, isInvalid, onChange }: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={"input-form " + (isInvalid ? "input-form-error" : "")}
    />
  );
};

export default InputForm;
