interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
}

export const NumberInput = ({
  label,
  value,
  onChange,
  min = 0,
  max,
  disabled = false,
  placeholder = "0",
  id,
  className = "",
}: NumberInputProps) => {
  const handleIncrement = () => {
    if (max !== undefined && value >= max) return;
    const newValue = (value || 0) + 1;
    onChange(newValue.toString());
  };

  const handleDecrement = () => {
    const newValue = Math.max((value || 0) - 1, min);
    onChange(newValue.toString());
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <div className="relative flex items-center">
        <button
          type="button"
          className="bg-gray-200 border border-gray-300 text-gray-900 rounded-l-lg p-2.5 hover:bg-gray-300 disabled:opacity-50"
          onClick={handleDecrement}
          disabled={disabled || value <= min}
        >
          -
        </button>
        <input
          type="number"
          id={id}
          className="bg-white border-t border-b border-gray-300 text-gray-900 text-sm w-full text-center focus:ring-accent focus:border-accent p-2.5 dark:focus:ring-accent dark:focus:border-accent"
          required
          value={value || ""}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button
          type="button"
          className="bg-gray-200 border border-gray-300 text-gray-900 rounded-r-lg p-2.5 hover:bg-gray-300 disabled:opacity-50"
          onClick={handleIncrement}
          disabled={disabled || (max !== undefined && value >= max)}
        >
          +
        </button>
      </div>
    </div>
  );
};
