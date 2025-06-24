import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

// Use forwardRef to pass ref to the input element
const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, placeholder, className = '', ...props }, ref) => {
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
            ${className}`}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
