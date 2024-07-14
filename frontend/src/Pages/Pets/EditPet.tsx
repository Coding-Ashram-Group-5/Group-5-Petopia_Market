import { Checkbox } from "@/components/Ui/checkbox";
import { getSinglePet, updatePet } from "@/lib/api";
import { PetForm } from "@/types/models";
import { Image, X } from "lucide-react";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditPet: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<PetForm>();
    const images = watch("images");
    const petImages = watch("petImages");

    const removeImage = (index: number) => {
        const newImagesArray = Array.from(images).filter((_, i) => i !== index);
        const newImages = new DataTransfer();
        newImagesArray.forEach((file) => newImages.items.add(file));
        setValue("images", newImages.files);
    };

    useEffect(() => {
        type PetKey =
            | "petName"
            | "petDescription"
            | "price"
            | "isFree"
            | "petType"
            | "petBread"
            | "diseases"
            | "petImages"
            | "images";

        const validKeys: PetKey[] = [
            "petName",
            "petDescription",
            "price",
            "isFree",
            "petType",
            "petBread",
            "diseases",
            "petImages",
            "images",
        ];

        getSinglePet(id).then((res: Record<string, any>) => {
            const val = res[0];

            for (const key in val) {
                if (
                    val.hasOwnProperty(key) &&
                    validKeys.includes(key as PetKey)
                ) {
                    setValue(key as PetKey, val[key]);
                }
            }
        });
    }, []);

    const onSubmit: SubmitHandler<PetForm> = async (data) => {
        if (!id) return;
        const res = await updatePet(id, data);
        if (res) {
            navigate("/pets");
        }
    };

    return (
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
            <div className="flex flex-wrap my-2 flex-col">
                <p className="text-xl">Uploaded images</p>
                {petImages && petImages?.length > 0 && (
                    <div className="flex gap-1 flex-wrap justify-start md:gap-2">
                        {petImages?.map((image, index) => (
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
                Edit Pet
            </button>
        </form>
    );
};

export default EditPet;
