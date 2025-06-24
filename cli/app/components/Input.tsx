import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    iconBefore?: React.ReactNode;
    iconAfter?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, placeholder, iconBefore, iconAfter, className = '', ...props }, ref) => {
        return (
            <div className="flex flex-col w-full relative">
                {label && (
                    <label
                        htmlFor={props.id || props.name}
                        className="mb-1 text-sm font-medium text-gray-700"
                    >
                        {label}
                    </label>
                )}
                <div className={`relative flex items-center w-full`}>
                    {iconBefore && (
                        <span className="absolute left-3 text-gray-500">
                            {iconBefore}
                        </span>
                    )}
                    <input
                        {...props}
                        ref={ref}
                        placeholder={placeholder}
                        name="input"
                        aria-label={label || placeholder || 'input field'}
                        className={`w-full py-2 px-3 rounded-xl border 
                            ${error ? 'border-red-500' : 'border-gray-300'} 
                            focus:outline-none focus:ring-2 
                            ${error ? 'focus:ring-red-400' : 'focus:ring-blue-400'}
                            bg-[var(--login-input-bg)] text-gray-800
                            ${iconBefore ? 'pl-10' : ''}
                            ${iconAfter ? 'pr-10' : ''}
                            ${className}`}
                    />
                    {iconAfter && (
                        <span className="absolute right-3 text-gray-500">
                            {iconAfter}
                        </span>
                    )}
                </div>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
