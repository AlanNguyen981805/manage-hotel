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
  type: "hotels" | "transportation" | "services" | "additionalCosts";
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
    option?: unknown,
  ) => {
    setForm((prevState) => {
      const hotelData = prevState[dayIndex][type] || [];
      const updatedData = [...hotelData];
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        [field]: option,
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

  const handleRemoveRow = (rowIndex: number) => {
    setForm((prevState) => {
      const hotelData = prevState[dayIndex][type] || [];
      const updatedData = [...hotelData];
      updatedData.splice(rowIndex, 1);

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
    handleRemoveRow,
  };
};

export default useFormSearchResult;
