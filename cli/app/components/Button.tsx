import { Loader2 } from 'lucide-react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: 'normal' | 'extra';
    rounded?: 'normal' | 'extra';
    icon?: React.ReactNode;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    label,
    variant = 'normal',
    rounded = 'extra',
    icon,
    loading = false,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles =
        'w-full py-3 text-center font-semibold text-sm flex items-center justify-center gap-2 transition';

    const variantStyles = {
        normal: 'bg-blue-600 text-white hover:bg-blue-700',
        extra: 'bg-gray-200 text-black hover:bg-gray-300',
    };

    const roundedStyles = {
        normal: 'rounded-xl',
        extra: 'rounded-full',
    }

    return (
        <button
            {...props}
            className={`${baseStyles} ${variantStyles[variant]} ${roundedStyles[rounded]} ${className} ${loading || disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading || disabled}
        >
            {loading ? (
                <div className='flex flex-row gap-2 justify-center items-center'>
                    <Loader2 className='text-lg animate-spin' />
                    <span className="animate-pulse">Loading...</span>
                </div>

            ) : (
                <>
                    {icon && <span className="text-lg">{icon}</span>}
                    {label}
                </>
            )}
        </button>
    );
};

export default Button;
