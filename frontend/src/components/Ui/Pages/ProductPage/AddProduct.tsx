import React from 'react';
import { useForm } from 'react-hook-form';
import { Pet } from '@/types/models';
import { Button } from "@/components/Ui/Buttons/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/Ui/dialog";
import { addPet } from '@/lib/api';
import { Input } from '@/components/Ui/input';
import { Label } from '@/components/Ui/label';
import { Checkbox } from '@/components/Ui/checkbox';

interface FormData {
  petName: string;
  petDescription: string;
  price: number;
  isFree: boolean;
  petType: string;
  petBreed: string;
  petImages: FileList;
}

const AddProduct: React.FC = () => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      petName: '',
      petDescription: '',
      price: 0,
      isFree: false,
      petType: '',
      petBreed: '',
      petImages: {} as FileList,
    }
  });

  const isFree = watch("isFree");

  const onSubmit = async (data: FormData) => {
    try {
      const response = await addPet(data as Pet);
      console.log('Pet added successfully:', response);
      // Add any further logic after successful request
    } catch (error) {
      console.error('Error adding pet:', error);
      // Handle error
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setValue("isFree", checked);
    if (checked) setValue("price", 0);
  };

  return (
    <div className='text-red-500 font-bold'>
      <Dialog>
        <DialogTrigger>Add Product</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Product Add ➕</DialogTitle>
            <DialogDescription>
              <div>
                <form action="">
                  <div className='flex gap-4'>
                    <Label htmlFor="petName" >
                      <Input
                        type="text"
                        {...register("petName", { required: true })}
                        placeholder="Pet Name"
                      />
                    </Label>
                    <Label htmlFor="petDescription">
                      <Input
                        type='text'
                        {...register('petDescription', { required: true })}
                        placeholder='Pet Description'
                      />
                    </Label>
                  </div>
                  <div className="flex items-center my-2 space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Is Your Pet Free?
                    </label>
                  </div>

                  <div className='flex gap-x-4'>
                   <ToggleType />
                    <div>
                      <Input
                        type='text'
                        {...register('petBreed', { required: true })}
                        placeholder='Pet Breed'
                      />
                    </div>
                  </div>



                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input id="picture" type="file" className='text-primary' />
                  </div>
                  <div className='my-2'>
                    <Button onClick={handleSubmit(onSubmit)}>Add Product</Button>
                  </div>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddProduct;

import { Dog, Cat , Monitor } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Ui/Menu/dropdown-menu"
import { useState } from "react";

const ToggleType = () => {

  const [type, setType] = useState("Dog");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">

          {type}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem   onClick={() => setType("Dog")}  className=" cursor-pointer">
          <Dog />  <span>Dog</span>
        </DropdownMenuItem>
        <DropdownMenuItem   onClick={() => setType("cat")} className=" cursor-pointer">
          <Cat /> <span> Cat</span>

        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setType("other")} className=" cursor-pointer">
          <Monitor /> <span>Other</span>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
