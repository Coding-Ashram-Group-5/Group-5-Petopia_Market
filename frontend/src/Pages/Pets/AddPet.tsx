import { Checkbox } from "@/components/Ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/Ui/dialog";
import { addPet } from "@/lib/api";
import { PetForm } from "@/types/models";
import { Image, X } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";
import animation from "./boxdoganimation.json";

const AddPet: React.FC = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<PetForm>();
    const images = watch("images");

    const removeImage = (index: number) => {
        const newImagesArray = Array.from(images).filter((_, i) => i !== index);
        const newImages = new DataTransfer();
        newImagesArray.forEach((file) => newImages.items.add(file));
        setValue("images", newImages.files);
    };

    const onSubmit: SubmitHandler<PetForm> = async (data) => {
        const res = await addPet(data);
        if (res.success) {
            setIsSuccess(true);
          }
    };

    return (
        <> {isSuccess && <SuccessfullyAdded />}
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md m-4 md:mx-auto flex flex-col"
        >
            <div className="mb-4">
                <label
                    htmlFor="petName"
                    className="block text-lg font-medium text-gray-700 dark:text-white"
                >
                    Pet Name
                </label>
                <input
                    type="text"
                    id="petName"
                    {...register("petName", { required: true })}
                    className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
                {errors.petName && (
                    <span className="text-red-500">Pet Name is required</span>
                )}
            </div>
            <div className="mb-4">
                <label
                    htmlFor="petDescription"
                    className="block text-lg font-medium text-gray-700 dark:text-white"
                >
                    Pet Description
                </label>
                <input
                    type="text"
                    id="petDescription"
                    {...register("petDescription", { required: true })}
                    className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
                {errors.petDescription && (
                    <span className="text-red-500">
                        Pet Description is required
                    </span>
                )}
            </div>
            <div className="flex justify-between items-end">
                <div className="mb-4">
                    <label
                        htmlFor="price"
                        className="block text-lg font-medium text-gray-700 dark:text-white"
                    >
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        {...register("price", { required: true })}
                        className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    />
                    {errors.price && (
                        <span className="text-red-500">Price is required</span>
                    )}
                </div>
                <div className="mb-4 flex items-center gap-x-2">
                    <Checkbox id="isFree" />
                    <label
                        htmlFor="isFree"
                        className="block text-lg font-medium text-gray-700 dark:text-white shrink-0"
                    >
                        Is Free
                    </label>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="mb-4">
                    <label
                        htmlFor="petType"
                        className="block text-lg font-medium text-gray-700 dark:text-white"
                    >
                        Pet Type
                    </label>
                    <input
                        type="text"
                        id="petType"
                        {...register("petType", { required: true })}
                        className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    />
                    {errors.petType && (
                        <span className="text-red-500">
                            Pet Type is required
                        </span>
                    )}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="petBread"
                        className="block text-lg font-medium text-gray-700 dark:text-white"
                    >
                        Pet Breed
                    </label>
                    <input
                        type="text"
                        id="petBreed"
                        {...register("petBread", { required: true })}
                        className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    />
                    {errors.petBread && (
                        <span className="text-red-500">
                            Pet Breed is required
                        </span>
                    )}
                </div>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="diseases"
                    className="block text-lg font-medium text-gray-700 dark:text-white"
                >
                    Diseases
                </label>
                <input
                    type="text"
                    id="diseases"
                    {...register("diseases", { required: true })}
                    className="mt-1 py-1 px-3 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
                {errors.diseases && (
                    <span className="text-red-500">Diseases is required</span>
                )}
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
                    className="hidden"
                />
                {errors.images && (
                    <span className="text-red-500">
                        {errors.images.message}
                    </span>
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
            <button
                type="submit"
                className="bg-indigo-500 text-white py-2 px-4 rounded place-items-center"
            >
                Add Pet
            </button>
        </form>
        </>
    );
};

export default AddPet;

const SuccessfullyAdded: React.FC = () => {
    return (
      <>
        <Dialog open={true}>
          <DialogTrigger ></DialogTrigger>
          <DialogContent>
            <div className="flex flex-col items-center justify-center gap-4">
              <h1 className="text-2xl font-bold">✅ Pet Added Successfully</h1>
              <Lottie animationData={animation} style={{ width: 350, height: 200 }} play loop />
              <div className='flex gap-x-4'>
                <Link to="/admin/pets/add" reloadDocument={true} className='bg-red-500 px-3 py-1 text-sm font-bold hover:bg-red-700 rounded-md text-white font-cab'>Add New Pet</Link>
                <Link to="/pets" className='bg-gray-400 px-3 py-1 rounded-md text-white text-sm font-bold hover:bg-gray-600 font-cab'>Go to Pets</Link>
                </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    )
  }