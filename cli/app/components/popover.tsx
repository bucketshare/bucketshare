'use client'

import {
    useEffect,
    useState,
    ReactElement,
    ReactNode,
    cloneElement,
} from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'

interface PopoverProps {
    children: [ReactElement<any>, ReactNode]
}

export default function Popover({ children }: PopoverProps) {
    const [open, setOpen] = useState(false)

    const [trigger, content] = children

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [])

    const triggerWithProps = cloneElement(trigger, {
        ...trigger.props,
        onClick: (e: any) => {
            trigger.props?.onClick?.(e)
            setOpen(true)
        },
    })

    // Close when dragged down past 100px
    const handleDragEnd = (_: any, info: PanInfo) => {
        if (info.offset.y > 100) {
            setOpen(false)
        }
    }

    return (
        <>
            {triggerWithProps}

            <AnimatePresence>
                {open && (
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
                    >
                        {/* Backdrop Click */}
                        <div
                            className="absolute inset-0"
                            onClick={() => setOpen(false)}
                        />

                       {/* VORHER: motion.div hatte drag="y" und onDragEnd */}

<motion.div
    key="content"
    initial={{ y: 50, opacity: 0, scale: 0.95 }}
    animate={{
        y: 0,
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', bounce: 0.2, duration: 0.4 },
    }}
    exit={{
        y: 50,
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.2 },
    }}
    className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:w-[90%] max-w-lg h-[75%] sm:h-auto p-4 sm:p-6 overflow-y-auto"
>
    {/* Drag-Bar (nur hier ist das Ziehen erlaubt) */}
    <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 300 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="sm:hidden flex justify-center mb-3 cursor-grab active:cursor-grabbing"
    >
        <div
            style={{ width: 40, height: 4, borderRadius: 2 }}
            className="bg-gray-300"
        />
    </motion.div>

    <>
        {content}
    </>

    <div className="mt-4 text-right">
        <button
            onClick={() => setOpen(false)}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 w-full sm:w-auto"
        >
            Close
        </button>
    </div>
</motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
