interface IProps {
    name: string;
    onAddRow?: () => void
}

export const BtnAddRow = ({ name, onAddRow }: IProps) => {
    return (
    <div className="flex justify-between items-center bg-accent">
        <h1 className="text-lg p-2">{name}</h1>
        
        {onAddRow && (
            <button
                className="bg-accent text-white px-4 rounded-md h-[40px]"
                onClick={() => onAddRow()}
                >
                Add Row
            </button>
        )}
      </div>
    )
}