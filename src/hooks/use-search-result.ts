import { Dispatch, SetStateAction } from "react";
import {
  IAdditionalCosts,
  IFormSearchResult,
  IHotel,
  IService,
  ITransportation,
} from "../components/features/home/result-search-booking/defination";

interface IProps {
  setForm: Dispatch<SetStateAction<IFormSearchResult>>;
  type: "hotel" | "transportation" | "services" | "additionalCosts";
  dayIndex: string;
  initialData: IHotel | ITransportation | IService | IAdditionalCosts;
}

const useFormSearchResult = ({
  setForm,
  type,
  dayIndex,
  initialData,
}: IProps) => {
  const handleAddRow = () => {
    setForm((prevState) => {
      const row = prevState[dayIndex][type] || [];
      const updatedDataRow = [...row];

      updatedDataRow.push(initialData);

      return {
        ...prevState,
        [dayIndex]: {
          ...prevState[dayIndex],
          [type]: updatedDataRow,
        },
      };
    });
  };

  const handleChange = (
    dayIndex: string,
    rowIndex: number,
    field: string,
    value: string
  ) => {
    setForm((prevState) => {
      const hotelData = prevState[dayIndex][type] || [];
      const updatedData = [...hotelData];

      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        [field]: value,
      };

      return {
        ...prevState,
        [dayIndex]: {
          ...prevState[dayIndex],
          [type]: updatedData,
        },
      };
    });
  };

  return {
    handleAddRow,
    handleChange,
  };
};

export default useFormSearchResult;
