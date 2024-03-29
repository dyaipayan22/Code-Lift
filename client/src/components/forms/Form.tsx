import { ReactElement, FC } from 'react';

interface FormProps {
  title: string;
  body: ReactElement;
  footer: ReactElement;
}

const Form: FC<FormProps> = ({ title, body, footer }) => {
  return (
    <>
      <div
        className=" relative
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto"
      >
        <div
          className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-sm
              relative 
              flex 
              flex-col 
              w-full 
              outline-none 
              focus:outline-none
              p-8
              gap-4
            "
        >
          <div className="text-lg font-semibold">{title}</div>
          <div>{body}</div>
          <div>{footer}</div>
        </div>
      </div>
    </>
  );
};

export default Form;
