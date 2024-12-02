'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVerifyOtp } from '@/features';

const StepBar = () => {
  return (
    <div className="flex justify-center items-center mb-8">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white max-sm:w-8 max-sm:h-8">
          1
        </div>
        <p className="text-sm mt-2">Forgot Password</p>
      </div>

      <div className="w-10 h-1 bg-blue-500 mx-2" />

      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white max-sm:w-8 max-sm:h-8">
          2
        </div>
        <p className="text-sm mt-2">Verify otp</p>
      </div>

      <div className="w-10 h-1 bg-gray-300 mx-2" />

      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-gray-600 max-sm:w-8 max-sm:h-8">
          3
        </div>
        <p className="text-sm mt-2">Reset password</p>
      </div>
    </div>
  );
};

const VerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate, isError, error } = useVerifyOtp();
  const router = useRouter();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Jika bukan angka, abaikan input

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Pindah ke input berikutnya secara otomatis jika sudah diisi
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    
    // Validasi OTP (misalnya, memastikan OTP terdiri dari 6 digit)
    if (otpCode.length !== 6) {
      setErrorMessage('OTP must be 6 digits long.');
      return;
    }

    const email = sessionStorage.getItem('email');
    if (!email) {
      setErrorMessage('Email is not available. Please try again.');
      return;
    }

    mutate({email, otp: otpCode}, {
      onSuccess: (data) => {
        console.log("Response data:", data);

        const token = data.token;
        console.log(token)
        if (token) {
          router.push(`/reset-password?token=${token}`);
        } else {
          setErrorMessage('Invalid otp, check sure otp on your email!');
          console.log("Full response:", data);
        }
      },
      
      onError: () => {
        setErrorMessage('Invalid OTP. Please try again.');
      },
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
      <StepBar />
        <h1 className="font-bold text-3xl mb-4 text-center">Verify OTP</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            {otp.map((data, index) => (
              <input
                className="w-10 h-10 border border-gray-400 text-center text-lg"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
