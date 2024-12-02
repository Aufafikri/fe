"use client"

import { useFetchProductId } from '@/features/users/merchant/products/useFetchProducts'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCartStore } from '../../../hooks/useCartStore'
import { ProductTypes } from '@/types/products/products'
import { useFetchProfileUser, useBcaCheckout, useCheckout } from '@/features'
import convertRupiah from 'rupiah-format'
import { Toaster, toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useBniCheckout } from '@/features/checkout/virtual_acount/useBniCheckout'

const CheckoutPage = () => {
    const searchParams = useSearchParams()
    const productId: any = searchParams.get("id")
    const { data: productData } = useFetchProductId(productId)
    const { data: userProfile } = useFetchProfileUser()
    const { cartItems } = useCartStore()
    const [product, setProduct] = useState<ProductTypes| null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

    const handleSelectPayment = (method: string) => {
      if (selectedPayment === method) {
          // Jika tombol yang sama di-klik lagi, batalkan pilihan
          setSelectedPayment(null);
          toast.success("Payment method deselected!");
      } else {
          setSelectedPayment(method); // Set metode yang dipilih
          toast.success(`${method} Virtual Account selected!`);
      }
  };

    const addressCountry = userProfile?.Address.country
    const addressCity = userProfile?.Address.city
    const addressId = userProfile?.Address.id

    const { mutate } = useCheckout()
    const { mutate: bcaCheckout } = useBcaCheckout()
    const { mutate: bniCheckout } = useBniCheckout()

    const profileId = userProfile?.id
    const profileName = userProfile?.name
    const profileEmail = userProfile?.email

    useEffect(() => {
        if (productId) {
          const selectedProduct = cartItems.find((item) => item.id === productId);
          setProduct(selectedProduct || null);
        }
      }, [productId, cartItems]);

    useEffect(() => {
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
        const clientKey: any = process.env.NEXT_PUBLIC_API_MIDTRANS_CLIENT_KEY
    
        console.log('Server Key:', process.env.NEXT_PUBLIC_API_MIDTRANS_CLIENT_SERVER);
    
        const script = document.createElement('script')
        script.src = snapScript
        script.setAttribute('data-client-key', clientKey)
        script.async = true
    
        document.body.appendChild(script)
    
        return () => {
            document.body.removeChild(script)
        }
      }, [])

      const confirmBni = async () => {
        if (!selectedPayment === "BNI") {
          toast.error("Please select BCA Virtual Account first!");
          return;
        }
        
        const orderId = `ORDER-${Date.now()}`;
        const grossAmount = product?.price * product?.quantity;

        try {
          bniCheckout(
            {
              orderId: orderId,
              grossAmount: grossAmount,
              quantity: product?.quantity,
              productPrice: product?.price
            },
            {
              onSuccess: ({ token }) => {
                window.snap.pay(token, {
                  onSuccess: (result: any) => {
                    console.log("Payment Success:", result);
                    window.location.href = "/status/payment-successfully";
                  },
                  onPending: (result: any) => {
                    console.log("Payment Pending:", result);
                    window.location.href = "/status/pending";
                  },
                  onError: (result: any) => {
                    console.error("Payment Error:", result);
                    toast.error("Oops! Something went wrong.");
                  },
                  onClose: () => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                    toast.error("Your payment was closed!");
                  },
                });
              },
              onError: (error) => {
                console.error("Transaction creation failed:", error);
                toast.error("Oops! Something went wrong.");
              },
            }
          )
        } catch (error) {
          toast.error("error")
        }
    
      }

      const confirmBca = async () => {
        if (!selectedPayment === "BCA") {
          toast.error("Please select BCA Virtual Account first!");
          return;
        }
        
        const orderId = `ORDER-${Date.now()}`;
        const grossAmount = product?.price * product?.quantity;

        try {
          bcaCheckout(
            {
              orderId: orderId,
              grossAmount: grossAmount,
              quantity: product?.quantity,
              productPrice: product?.price
            },
            {
              onSuccess: ({ token }) => {
                window.snap.pay(token, {
                  onSuccess: (result: any) => {
                    console.log("Payment Success:", result);
                    window.location.href = "/status/payment-successfully";
                  },
                  onPending: (result: any) => {
                    console.log("Payment Pending:", result);
                    window.location.href = "/status/pending";
                  },
                  onError: (result: any) => {
                    console.error("Payment Error:", result);
                    toast.error("Oops! Something went wrong.");
                  },
                  onClose: () => {
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                    toast.error("Your payment was closed!");
                  },
                });
              },
              onError: (error) => {
                console.error("Transaction creation failed:", error);
                toast.error("Oops! Something went wrong.");
              },
            }
          )
        } catch (error) {
          toast.error("error")
        }
    
      }

      const confirmPurchase = async () => {
        if (!selectedPayment) {
            toast.error("Please select a payment method first!");
            return;
        }

        const orderId = `ORDER-${Date.now()}`;
        const grossAmount = product?.price * product?.quantity;

        try {
            const checkoutFn = selectedPayment === "BCA" ? bcaCheckout : bniCheckout;
            checkoutFn(
                {
                    orderId: orderId,
                    grossAmount: grossAmount,
                    quantity: product?.quantity,
                    productPrice: product?.price
                },
                {
                    onSuccess: ({ token }) => {
                        window.snap.pay(token, {
                            onSuccess: (result: any) => {
                                console.log("Payment Success:", result);
                                window.location.href = "/status/payment-successfully";
                            },
                            onPending: (result: any) => {
                                console.log("Payment Pending:", result);
                                window.location.href = "/status/pending";
                            },
                            onError: (result: any) => {
                                console.error("Payment Error:", result);
                                toast.error("Oops! Something went wrong.");
                            },
                            onClose: () => {
                                setTimeout(() => {
                                    window.location.reload();
                                }, 1000);
                                toast.error("Your payment was closed!");
                            },
                        });
                    },
                    onError: (error) => {
                        console.error("Transaction creation failed:", error);
                        toast.error("Oops! Something went wrong.");
                    },
                }
            );
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };
  return (
    <div className="p-16">
    {/* <h2 className="text-2xl">Checkout</h2>
    <div className="shadow-md p-4 mt-4">
      <img src={product?.image} alt="" className="w-40 h-40" />
      <h3 className="text-xl">{product?.name}</h3>
      <p>Price: {convertRupiah.convert(product?.price)}</p>
      <p>Quantity: {product?.quantity}</p>
      <p>Subtotal: {convertRupiah.convert(product?.price * product?.quantity)}</p>
      <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={confirmPurchase}>
        Confirm Purchase
      </button>
      <motion.button
          onClick={() => handleSelectPayment("BCA")}
          className={`py-2 px-6 ml-6 relative ${selectedPayment === "BCA" ? "bg-gray-200" : null}`}
          initial={{ scale: 1 }}
          animate={{ scale: selectedPayment === "BCA" ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src="./assets/virtual_account/bca_logo.png"
            alt="BCA Logo"
            className="w-full h-6 object-cover"
          />
        </motion.button>
        <motion.button
          onClick={() => handleSelectPayment("BNI")}
          className={`py-2 px-6 ml-6 relative ${selectedPayment === "BNI" ? "bg-gray-200" : null}`}
          initial={{ scale: 1 }}
          animate={{ scale: selectedPayment === "BNI" ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src="./assets/virtual_account/bni_logo.png"
            alt="BCA Logo"
            className="w-full h-6 object-cover"
          />
        </motion.button>
    </div> */}
    <div className='flex gap-12 justify-center'>
      <img src={`${product?.image}`} className='w-96 h-96 object-cover' />
      <div>
        <h1 className='font-bold text-2xl'> {product?.name} </h1>
        <h3 className='font-semibold mt-6 text-xl mb-3'> Virtual Accounts </h3>
        <div className='grid grid-cols-3 gap-4'>
        <motion.button
          onClick={() => handleSelectPayment("BNI")}
          className={`py-2 px-6 bg-gray-800 border relative ${selectedPayment === "BNI" ? "bg-gray-200" : null}`}
          initial={{ scale: 1 }}
          animate={{ scale: selectedPayment === "BNI" ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src="./assets/virtual_account/bni_logo.png"
            alt="BCA Logo"
            className="w-full h-6 object-cover"
          />
        </motion.button>
        <motion.button
          onClick={() => handleSelectPayment("BCA")}
          className={`py-2 px-6 bg-gray-800 relative ${selectedPayment === "BCA" ? "bg-gray-200" : null} border`}
          initial={{ scale: 1 }}
          animate={{ scale: selectedPayment === "BCA" ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
          <img
            src="./assets/virtual_account/bca_logo.png"
            alt="BCA Logo"
            className="w-full h-6 object-cover"
            />
        </motion.button>
        <motion.button
          onClick={() => handleSelectPayment("BCA")}
          className={`py-2 px-6 bg-gray-800 relative ${selectedPayment === "BCA" ? "bg-gray-200" : null} border`}
          initial={{ scale: 1 }}
          animate={{ scale: selectedPayment === "BCA" ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
          <img
            src="./assets/virtual_account/bri_logo.png"
            alt="BCA Logo"
            className="w-full h-6 object-cover"
            />
        </motion.button>
        <motion.button
          onClick={() => handleSelectPayment("BCA")}
          className={`py-2 px-6 bg-gray-800 relative ${selectedPayment === "BCA" ? "bg-gray-200" : null} border`}
          initial={{ scale: 1 }}
          animate={{ scale: selectedPayment === "BCA" ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
          <img
            src="./assets/virtual_account/logo-mandiri.png"
            alt="BCA Logo"
            className="w-full h-6 object-cover"
            />
        </motion.button>
        <motion.button
          onClick={() => handleSelectPayment("BCA")}
          className={`py-2 px-6 bg-gray-800 relative ${selectedPayment === "BCA" ? "bg-gray-200" : null} border`}
          initial={{ scale: 1 }}
          animate={{ scale: selectedPayment === "BCA" ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
          <img
            src="./assets/virtual_account/cimb_logo.png"
            alt="BCA Logo"
            className="w-full h-6 object-cover"
            />
        </motion.button>
        <motion.button
          onClick={() => handleSelectPayment("BCA")}
          className={`py-2 px-6 bg-gray-800 relative ${selectedPayment === "BCA" ? "bg-gray-200" : null} border`}
          initial={{ scale: 1 }}
          animate={{ scale: selectedPayment === "BCA" ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
          <img
            src="./assets/virtual_account/permata_logo.png"
            alt="BCA Logo"
            className="w-full h-6 object-cover"
            />
        </motion.button>
            </div>
            <hr className='bg-white mt-8 mb-1.5' />
            <h1 className='font-semibold text-base text-gray-400'>Subtotal : {convertRupiah.convert(product?.price * product?.quantity)}</h1>
            <h1 className='font-semibold text-base text-gray-400'>Quantity : {product?.quantity}</h1>
            <button className="bg-blue-500 text-white w-full py-2 mt-4" onClick={confirmPurchase}>
            Confirm Purchase
      </button>
      </div>
    </div>
    <Toaster />
  </div>
  )
}

export default CheckoutPage