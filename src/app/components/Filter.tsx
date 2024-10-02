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
      <div className="">
        <input 
          type="checkbox" 
          checked={value.includes(label)} 
          onChange={() => handleStatusChange(label)} 
          {...props} 
          />
          <label>{label}</label>
      </div>
    );
  };
  