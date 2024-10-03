interface FilterProps {
    label: string;
    value: string[];  
    setValue: React.Dispatch<React.SetStateAction<string[]>>;  
  }
  
  export const Filter: React.FC<FilterProps> = ({ label, value, setValue, ...props }) => {
    
    const handleStatusChange = (label: string) => {
      if (value.includes(label)) {
        setValue(value.filter(s => s !== label));
      } else {
        setValue([...value, label]);
    }
    };
  
    return (
      <div className="flex flex-row group items-center gap-3 group-hover:cursor-pointer" onClick={() => handleStatusChange(label)}>
          <div className="w-[19px] h-[19px]">
            <input
            className="appearance-none w-full h-full rounded-sm border bg-dark-blue border-dark-blue group-hover:border-violet checked:bg-violet checked:border-violet"
            name={label}
            type="checkbox" 
            checked={value.includes(label)} 
            {...props} 
          />
          </div>
          <label className="text-xs font-bold" htmlFor={label}>{label}</label>
      </div>
    );
  };
  