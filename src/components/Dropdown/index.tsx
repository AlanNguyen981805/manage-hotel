interface IProps<T> {
  options: T[];
  name: string;
  onChange: (value: string) => void;
  value: string;
}
const Dropdown = <T extends { value: string | number; name: string }>({
  options,
  name,
  onChange,
  value,
}: IProps<T>) => {
  return (
    <select
      className="bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-gray-700"
      name={name}
      id={name}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
