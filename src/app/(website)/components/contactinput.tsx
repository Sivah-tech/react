import { ChangeEvent, FC } from 'react';

interface ContactInputFieldProps {
  type: string;
  value?: string;
  placeholder: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean;
  label?: string; // Added label prop for better readability and accessibility
  name?: string; 
  id?: string;
}

const contactInput: FC<ContactInputFieldProps> = ({ type, value, placeholder, onChange , required, label, name }) => {
  return (
    <div className='mb-[30px]'>
      {/* <label htmlFor="" className='text-[#353E6C] mb-2.5 inline-block text-base leading-[normal]  '>{label}</label> */}
      <input
      className='w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6'
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
    </div>

  );
};

export default contactInput;
