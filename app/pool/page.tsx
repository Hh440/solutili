'use client'
import { useEffect, useRef, useState } from 'react';
import Money from './component/Money';

const Pool = () => {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setIsFormVisible(false);
            }
        };

        const handleFormClick = (event: MouseEvent) => {
            event.stopPropagation(); // Prevent click from propagating to the background
        };

        document.addEventListener('mousedown', handleClickOutside);
        if (formRef.current) {
            formRef.current.addEventListener('click', handleFormClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (formRef.current) {
                formRef.current.removeEventListener('click', handleFormClick);
            }
        };
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isFormVisible) {
            timer = setTimeout(() => {
                setIsFormVisible(true);
            }, 1000); // 100 seconds
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isFormVisible]);

    return (
        <div className='relative w-full h-screen overflow-hidden'>
            {/* Money model in the foreground */}
            <div className='absolute inset-0 w-full h-full z-10'>
                <Money  /> {/* Adjust scale as needed */}
            </div>
            
            {/* Dark overlay on top of the Money model */}
            <div className='absolute inset-0 bg-black opacity-50 z-20'></div>

            {/* Container for the form */}
            {isFormVisible && (
                <div className='absolute inset-0 flex items-center justify-center z-30'>
                    <div 
                        ref={formRef} 
                        className='w-full max-w-lg bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-lg p-8 shadow-lg border border-gray-700'
                    >
                        <h2 className='text-3xl font-bold mb-6 text-gray-200'>Liquidity Pool Input</h2>
                        <form className='space-y-6'>
                            <div>
                                <label htmlFor='amount' className='block text-gray-300 mb-2'>Amount</label>
                                <input 
                                    type='number' 
                                    id='amount' 
                                    name='amount' 
                                    className='w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400'
                                    placeholder='Enter amount'
                                />
                            </div>
                            <div>
                                <label htmlFor='pool' className='block text-gray-300 mb-2'>Pool Address</label>
                                <input 
                                    type='text' 
                                    id='pool' 
                                    name='pool' 
                                    className='w-full p-3 border border-gray-600 rounded-lg bg-gray-900 text-gray-200 placeholder-gray-400'
                                    placeholder='Enter pool address'
                                />
                            </div>
                            <button 
                                type='submit' 
                                className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-transform duration-300 ease-in-out transform hover:scale-105'
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pool;
