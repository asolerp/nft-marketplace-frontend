import React from 'react'

type ButtonProps = {
  label: string
  active?: boolean
  fit?: boolean
  customTextStyle?: string
  containerStyle?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  label,
  active,
  fit = true,
  customTextStyle,
  containerStyle,
  ...props
}) => {
  const activeClass = active
    ? 'bg-caskchain text-blackLight'
    : 'bg-transparent ring-caskchain ring-2 text-caskchain'
  const fitClass = fit ? 'w-fit' : 'w-full'

  const textStyle = customTextStyle ? customTextStyle : 'text-2l font-semibold'
  const style = containerStyle ? containerStyle : 'px-8 py-5'

  return (
    <button
      className={`${activeClass} ${fitClass} rounded-full ${style} font-poppins ${textStyle}`}
      {...props}
    >
      {label}
    </button>
  )
}

export default Button
