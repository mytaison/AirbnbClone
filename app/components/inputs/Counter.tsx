import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: Number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subTitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);
  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [value, onChange]);

  const counterButtonStyle =
    "w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 hover:opacity-80 transition";
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-800">{subTitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div onClick={onReduce} className={counterButtonStyle}>
          <AiOutlineMinus></AiOutlineMinus>
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div onClick={onAdd} className={counterButtonStyle}>
          <AiOutlinePlus></AiOutlinePlus>
        </div>
      </div>
    </div>
  );
};

export default Counter;
