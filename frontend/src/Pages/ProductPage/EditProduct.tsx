import { getSingleProduct, updateProduct } from "@/lib/ProductApi";
import { ProductForm } from "@/types/models";
import { Image, X } from "lucide-react";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductForm>();
  const images = watch("images");
  const productImages = watch("productImages");

  const removeImage = (index: number) => {
    const newImagesArray = Array.from(images).filter((_, i) => i !== index);
    const newImages = new DataTransfer();
    newImagesArray.forEach((file) => newImages.items.add(file));
    setValue("images", newImages.files);
  };
  useEffect(() => {
    const fetchProductData = async () => {
      type ProductKey =
            | "productName"
            | "productDescription"
            | "productPrice"
            | "discount"
            | "category"
            | "quantity"
            | "diseases"
            | "productImages"
            | "images";
      const validKeys: (keyof ProductForm)[] = [
        "productName",
        "productDescription",
        "productPrice",
        "discount",
        "category",
        "quantity",
        "productImages",
        "images",
      ];

      try {
        const res = await getSingleProduct(id || "");
        console.log("Product Data:", res.data);
        const val = res.data[0];
        

        validKeys.forEach((key) => {
          if (key in val) {
            console.log(`Setting value for ${key}:`, val[key]);
            setValue(key as ProductKey , val[key] as any);  
          }
        });
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProductData();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    if (!id) return;
    const res = await updateProduct(id, data);
    if (res) {
      navigate("/products");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md m-4 md:mx-auto flex flex-col"
    >
      <div className="mb-4">
        <label
          htmlFor="productName"
          className="block text-lg font-medium text-gray-700 dark:text-white"
        >
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          {...register("productName", { required: true })}
          className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
        {errors.productName && (
          <span className="text-red-500">Product Name is required</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="productDescription"
          className="block text-lg font-medium text-gray-700 dark:text-white"
        >
          Product Description
        </label>
        <input
          type="text"
          id="productDescription"
          {...register("productDescription", { required: true })}
          className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
        {errors.productDescription && (
          <span className="text-red-500">Product Description is required</span>
        )}
      </div>
      <div className="flex justify-between items-end">
        <div className="mb-4">
          <label
            htmlFor="productPrice"
            className="block text-lg font-medium text-gray-700 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="productPrice"
            {...register("productPrice", { required: true })}
            className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
          {errors.productPrice && (
            <span className="text-red-500">Price is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="discount"
            className="block text-lg font-medium text-gray-700 dark:text-white"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            {...register("discount")}
            className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
          {errors.discount && (
            <span className="text-red-500">Discount is required</span>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700 dark:text-white"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            {...register("category", { required: true })}
            className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
          {errors.category && (
            <span className="text-red-500">Category is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-lg font-medium text-gray-700 dark:text-white"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            {...register("quantity", { required: true })}
            className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
          {errors.quantity && (
            <span className="text-red-500">Quantity is required</span>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="images"
          className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-white cursor-pointer"
        >
          <Image size={32} />
          <span>(png, jpg, jpeg Only)</span>
        </label>
        <input
          type="file"
          id="images"
          {...register("images", {
            validate: {
              maxFiles: (files: FileList) =>
                files.length <= 5 || "Max 5 images allowed",
              acceptedFormats: (files: FileList) => {
                const acceptedFormats = ["image/png", "image/jpeg", "image/jpg"];
                for (let i = 0; i < files.length; i++) {
                  if (!acceptedFormats.includes(files[i].type)) {
                    return "Only png, jpg, jpeg images are allowed";
                  }
                }
                return true;
              },
            },
          })}
          multiple
          className="hidden"
        />
        {errors.images && (
          <span className="text-red-500">{errors.images.message}</span>
        )}
      </div>
      <div className="flex flex-wrap my-2">
        {images && images?.length > 0 && (
          <div className="flex gap-1 flex-wrap justify-start md:gap-2">
            {Array.from(images).map((image, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={URL.createObjectURL(image).toString()}
                  alt={`${image?.name}`}
                  className="w-full h-full rounded-md"
                />
                <button
                  title="Remove Image"
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 p-1 text-red-500 rounded-full"
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap my-2 flex-col">
        <p className="text-xl">Uploaded images</p>
        {productImages && productImages?.length > 0 && (
          <div className="flex gap-1 flex-wrap justify-start md:gap-2">
            {productImages?.map((image, index) => (
              <div key={index} className="relative w-32 h-32">
                <img
                  src={image.url}
                  alt={`${image?._id}`}
                  className="w-full h-full rounded-md"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-indigo-500 text-white py-2 px-4 rounded place-items-center"
      >
        Edit Product
      </button>
    </form>
  );
};

export default EditProduct;
