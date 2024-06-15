
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from "@/components/Ui/Buttons/button";
import { Input } from '@/components/Ui/input';
import { Label } from '@/components/Ui/label';
import { ProductForm } from '@/types/models';
import { Trash2 } from 'lucide-react';
import { addProduct } from "@/lib/ProductApi";

const AddProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductForm>();

  const images = watch("images");

  const removeImage = (index: number) => {
    const newImagesArray = Array.from(images).filter((_, i) => i !== index);
    const newImages = new DataTransfer();
    newImagesArray.forEach(file => newImages.items.add(file));
    setValue("images", newImages.files);
  };

  const onSubmit: SubmitHandler<ProductForm> = async (data) => {
    const res = await addProduct(data);
    console.log(res);
  };

  return (
    <>
      <div className="main">
        <div className="form flex justify-center p-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex gap-4'>
              <div className="form-group w-full">
                <Label htmlFor="name">Product Name</Label>
                <Input type="text" id="name" placeholder="Enter Product Name" {...register('productName', { required: 'Product Name is required' })} />
                {errors.productName && <p className="error">{errors.productName.message}</p>}
              </div>
              <div className="form-group w-full">
                <Label htmlFor="price">Product Price</Label>
                <Input type="number" id="price" className='' placeholder="Enter Product Price" {...register('productPrice', { required: 'Product Price is required', min: 0 })} />
                {errors.productPrice && <p className="error">{errors.productPrice.message}</p>}
              </div>
              <div className="form-group">
                <Label htmlFor="discount">Discount</Label>
                <Input type="number" id="discount" className='w-28' placeholder="Enter Discount" {...register('discount', { min: 0 })} />
                {errors.discount && <p className="error">{errors.discount.message}</p>}
              </div>
            </div>
            <div className="form-group">
              <Label htmlFor="description">Product Description</Label>
              <Input id="description" placeholder="Enter Product Description" {...register('productDescription', { required: 'Product Description is required' })} />
              {errors.productDescription && <p className="error">{errors.productDescription.message}</p>}
            </div>
            <div className='flex justify-between gap-x-2'>
              <div className='w-full'>
                <Label htmlFor="category">Category</Label>
                <Input type="text" id="category" className='w-full' placeholder="Enter Category" {...register('category', { required: 'Category is required' })} />
                {errors.category && <p className="error">{errors.category.message}</p>}
              </div>
              <div className="form-group">
                <Label htmlFor="quantity">Quantity</Label>
                <Input type="number" id="quantity" className='w-28' placeholder="Enter quantity" {...register('quantity', { min: 0 })} />
                {errors.quantity && <p className="error">{errors.quantity.message}</p>}
              </div>
            </div>
            <div className="form-group mb-2">
              <Label htmlFor="images">Product Images</Label>
              <Input
                type="file"
                id="images"
                {...register("images", {
                  validate: {
                    maxFiles: (files: FileList) =>
                      files.length <= 5 || "Max 5 images allowed",
                    acceptedFormats: (files: FileList) => {
                      const acceptedFormats = [
                        "image/png",
                        "image/jpeg",
                        "image/jpg",
                      ];
                      for (let i = 0; i < files.length; i++) {
                        if (
                          !acceptedFormats.includes(files[i].type)
                        ) {
                          return "Only png, jpg, jpeg images are allowed";
                        }
                      }
                      return true;
                    },
                  },
                })}
                multiple
                className="mt-1 py-1 px-3 block w-full  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white"
              />

              <div className="image-preview flex flex-wrap gap-2 mt-2">
                {images && images.length > 0 && (
                  <div className="flex gap-1 flex-wrap justify-start md:gap-2">
                    {Array.from(images).map((image, index) => (
                      <div key={index} className="relative w-32 h-32">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`${image.name}`}
                          className="w-full h-full rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-0 right-0 p-1 text-red-500 rounded-full"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <Button type="submit">Add Product</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

