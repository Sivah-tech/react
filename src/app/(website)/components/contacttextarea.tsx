import { ChangeEvent, FC } from 'react';

interface InputFieldProps {
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  label?: string; // Added label prop for better readability and accessibility
  name?: string;
  id?: string;
  rows?: number; // Use `rows` for defining the number of rows in the text area
}

const ContactTextArea: FC<InputFieldProps> = ({
  value,
  placeholder,
  onChange,
  required,
  label,
  name,
  rows = 4, // default rows to 4 if not provided
}) => {
  return (
    <div className='mb-[30px]'>
      {/* Uncomment to use the label */}
      {/* <label htmlFor={id} className='text-[#353E6C] mb-2.5 inline-block text-base leading-[normal]'>{label}</label> */}
      <textarea
        className='w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6'
        rows={rows}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default ContactTextArea;
