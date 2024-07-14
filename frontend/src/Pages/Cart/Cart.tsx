import useStore from "@/hooks/useStore";
import { useEffect, useState } from "react";
import { useToast } from "@/components/Ui/use-toast";
import { payment, paymentSuccess } from "@/lib/api";
import usePersonStore from "@/lib/Utils/zustandStore";
import { generateAlphanumericString } from "@/lib/Utils/util";
export default function Cart() {
    const { cartItems, removeAllProducts } = useStore();
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const user = usePersonStore((state) => state);

    useEffect(() => {
        const amount = cartItems.reduce(
            (acc, item) => acc + item.productPrice,
            0,
        );
        setTotalAmount(amount);
    }, []);

    function loadScript(src: string) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js",
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const receipt = generateAlphanumericString();
        const result = await payment({
            amount: totalAmount * 100,
            currency: "INR",
            receipt,
            notes: {},
        });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: amount.toString(),
            currency,
            name: "Petopia",
            description: "Test Transaction",
            order_id,
            handler: async function (response: any) {
                const data = {
                    // orderCreationId: order_id,
                    payment_id: response.razorpay_payment_id,
                    order_id: response.razorpay_order_id,
                    // razorpaySignature: response.razorpay_signature,
                };
                const signature = response.razorpay_signature;

                const result = await paymentSuccess({
                    data,
                    signature,
                });

                alert(result?.message);

                if (result?.success) {
                    removeAllProducts();
                }
            },
            prefill: {
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                contact: "9876543210",
            },
            notes: {
                address: "Petopia",
            },
            theme: {
                color: "#ef4444",
            },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
            <div className="mt-2">
                <div className="overflow-y-scroll h-[52vh] border">
                    {cartItems.map((item) => {
                        return <Card data={item} />;
                    })}
                </div>
                <div className="flex justify-end px-4  pt-4 gap-x-4">
                    <button
                        type="button"
                        onClick={() => removeAllProducts()}
                        className="bg-gray-200 text-black px-2 py-1 rounded-lg font-bold text-sm"
                    >
                        Clear Cart
                    </button>
                    <button
                        type="button"
                        disabled={cartItems.length === 0}
                        onClick={displayRazorpay}
                        className="bg-red-500 text-white px-2 py-1 rounded-lg font-bold text-sm disabled:bg-opacity-80 disabled:cursor-not-allowed"
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </>
    );
}

const Card = ({ data }: any) => {
    const { removeProduct } = useStore();
    const { toast } = useToast();
    const [count, setCount] = useState<number>(1);

    const increment = () => {
        setCount((prevCount) => (prevCount < 10 ? prevCount + 1 : prevCount));
    };

    const decrement = () => {
        setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount));
    };

    const removeHandle = () => {
        removeProduct(data._id);
        toast({
            title: "Product Removed",
            description: "Product has been removed from cart",
        });
    };

    return (
        <>
            <div className="Products px-1 mt-2">
                <div className="product flex px-2">
                    <div className="product-image mx-2 md:mx-5">
                        <img
                            src={data.productImages[0].url}
                            className=" w-[180px] rounded-xl"
                            alt="product"
                        />
                    </div>
                    <div className="product-details">
                        <h1 className="text-lg font-bold">
                            {data.productName}
                        </h1>
                        <p className="text-sm">Price: ₹{data.productPrice}</p>

                        <div className="flex gap-x-2  pt-2">
                            <button
                                type="button"
                                className="bg-gray-200 text-black px-2 py-1 rounded-md font-bold text-sm disabled:bg-gray-200/50"
                                onClick={decrement}
                                disabled={count <= 1}
                            >
                                -
                            </button>
                            <p className="bg-gray-200 text-black px-3 py-1 rounded-md font-bold text-sm">
                                {count}
                            </p>
                            <button
                                type="button"
                                className="bg-gray-200 text-black px-2 py-1 rounded-md font-bold text-sm disabled:bg-gray-200/50"
                                onClick={increment}
                                disabled={count >= 10}
                            >
                                +
                            </button>
                            <button
                                type="button"
                                onClick={removeHandle}
                                className=" bg-red-500 text-white px-2 py-1 rounded-lg font-bold text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
