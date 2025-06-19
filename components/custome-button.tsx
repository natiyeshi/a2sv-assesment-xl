import { Button } from "./ui/button"


const CustomButton = ({ children, onClick, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      onClick={onClick}
      className={`bg-[#FFB30E] hover:bg-[#FFB30E]/90 text-white px-6 py-[4px] rounded-lg shadow-md ${className}`}
      style={{
        boxShadow: '0 4px 20px 0 #FFB30E80, 0 1.5px 0 0 #fff6cc inset'
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default CustomButton;