import  useStore  from "@/hooks/useStore";
export default function Cart() {
    const { cartItems, removeAllProducts } = useStore();
    return (
        <>
            <div className="mt-2">
                <div className=" overflow-y-scroll h-[52vh]">
                    {
                        cartItems.map((item) => {
                            return <Card  data={item} />
                        })
                    }
                </div>
                <div className="flex justify-end px-4  pt-4 gap-x-4">
                    <button onClick={() => removeAllProducts()} className="bg-gray-200 text-black px-2 py-1 rounded-lg font-bold text-sm">Clear Cart</button>
                    <button className=" bg-red-500 text-white px-2 py-1 rounded-lg font-bold text-sm">Buy Now</button>
                </div>
            </div>
        </>
    )
}
const Card = ({data}:any) => {
    const { removeProduct } = useStore();

    const removeHandle = () => {
        removeProduct(data._id)
        alert("Product Removed")
    }
    return <>
        <div className="Products px-1 mt-2">
            <div className="product flex px-2">
                <div className="product-image mx-2 md:mx-5">
                    <img src={data.productImages[0].url} className=" w-[180px] rounded-xl" alt="product" />
                </div>
                <div className="product-details">
                    <h1 className="text-lg font-bold">{data.productName}</h1>
                    <p className="text-sm">Price: ${data.productPrice}</p>
                    <p className="text-sm">Quantity: 1</p>
                    <div className="flex gap-x-2  pt-2">
                    <button className="bg-gray-200 text-black px-2 py-1 rounded-lg font-bold text-sm">Count</button>
                    <button onClick={removeHandle} className=" bg-red-500 text-white px-2 py-1 rounded-lg font-bold text-sm">Remove</button>
                </div>
                </div>
                
            </div>
        </div>
    </>

}