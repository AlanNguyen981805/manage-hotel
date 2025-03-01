import Dropdown from "@/components/Dropdown";

export const Services = () => {
  const cities = [
    {
      name: "Ha Noi",
      value: 1,
    },
    {
      name: "TP H.C.M",
      value: 2,
    },
    {
      name: "Hai Phong",
      value: 3,
    },
  ];

  return (
    <div className="flex my-3">
      <p>Typeof car</p>
      <Dropdown options={cities} name="city" />

      <p>1 chieu</p>
      <Dropdown options={cities} name="city" />

      <p>2 chieu</p>
      <Dropdown options={cities} name="city" />

      <p className="text-2xl"> +</p>
    </div>
  );
};
