import useStore from "@/hooks/useStore";
import { useState } from "react";
import { useToast } from "@/components/Ui/use-toast";
import { payment, paymentSuccess } from "@/lib/api";
export default function Cart() {
    const { cartItems, removeAllProducts } = useStore();
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
        const result = await payment();

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: process.env.RAZORPAY_KEY,
            amount: amount.toString(),
            currency: currency,
            name: "Petopia",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response: any) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = paymentSuccess(data);

                alert(result);
            },
            // prefill: {
            //     name: "Petopia",
            //     email: "user@petopia.com",
            //     contact: "9999999999",
            // },
            notes: {
                address: "Petopia",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
    }

    return (
        <>
            <div className="mt-2">
                <div className=" overflow-y-scroll h-[52vh]">
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
                        onClick={displayRazorpay}
                        className=" bg-red-500 text-white px-2 py-1 rounded-lg font-bold text-sm"
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
