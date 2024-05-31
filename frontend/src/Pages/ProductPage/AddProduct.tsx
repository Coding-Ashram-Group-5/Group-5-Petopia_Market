import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from "@/components/Ui/Buttons/button";
import { Input } from '@/components/Ui/input';
import { Label } from '@/components/Ui/label';
import { Product} from '@/types/models'



const AddProduct: React.FC = () => {
  const { control, handleSubmit, register, formState: { errors } } = useForm<Product>({
    defaultValues: {
      productName: '',
      productDescription: '',
      productPrice: 0,
      discount: 0,
      creator: '',
      productImages: [{ publicId: '', url: '' }],
      quantity: 1,
      category: [''],
      averageRating: 0,
    },
  });
  const [ files, setFiles ] = React.useState<FileList | null>(null)
  
  
    
  
  


  return (
    <>
        <div className="main">
          <div className="form flex justify-center">
            <form  onSubmit={handleSubmit((data) => {
              console.log(data)
            })}
            onSuccess={() => {
              alert("Your application is updated.")
            }}
            onError={() => {
              alert("Submission has failed.")
            }}
            control={control} >
              <div className="form-group">
                <Label htmlFor="name">Product Name</Label>
                <Input type="text" id="name"  placeholder="Enter Product Name" {...register('productName', { required: 'Product Name is required' })} />
              </div>
              <div className="form-group">
                <Label htmlFor="description">Product Description</Label>
                <Input id="description" name="description" placeholder="Enter Product Description"></Input>
              </div>
              <div className="form-group">
                <Label htmlFor="price">Product Price</Label>
                <Input type="text" id="price" name="price" placeholder="Enter Product Price" />
              </div>
              <div className="form-group">
                <Label htmlFor="type">Product Type</Label>
                <Input type="text" id="type" name="type" placeholder="Enter Product Type" />
              </div>
              <div className="form-group">
                <Label htmlFor="breed">Product Breed</Label>
                <Input type="text" id="breed" name="breed" placeholder="Enter Product Breed" />
              </div>
              <div className="form-group">
                <Label htmlFor="images">Product Images</Label>
                <Input type="file" id="images" name="images" value={files && null} onChange={(e) => setFiles(e.target.files[0])} placeholder="Enter Product Images" />
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
