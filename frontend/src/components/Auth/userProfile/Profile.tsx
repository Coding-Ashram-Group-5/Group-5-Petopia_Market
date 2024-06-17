import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { profile, deleteAccount } from '@/lib/api';
import usePersonStore from '@/lib/Utils/zustandStore';

interface APIError {
    errorMessage: string;
    data: null;
    statusCode: number;
    errors: never[] | string[];
    success: boolean;
}

const Profile = () => {
    const { _id, firstName, lastName, email, avatar } = usePersonStore();
    const [isConfirming, setIsConfirming] = useState(false);
    const [confirmationPhrase, setConfirmationPhrase] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [showOverlay, setShowOverlay] = useState(false);
    const { updatePerson } = usePersonStore(state => ({
        updatePerson: state.updatePerson,
    }));

    const fetchData = useCallback(async () => {
        try {
            const userData = await profile();
            if (userData && userData.data) {

                const { _id, firstName, lastName, email, avatar } = userData.data;

                if(!_id || !lastName || !avatar){
                    throw new Error("Required Fields are Missing");
                }

                updatePerson(_id, firstName, lastName, email, avatar);
            }
        } catch (error) {
            console.error('Failed to fetch user details', error);
            if (axios.isAxiosError(error)) {
                const apiErrorResponse = (error as AxiosError<APIError>).response?.data;
                console.error(`Error ${apiErrorResponse?.statusCode}: ${apiErrorResponse?.errorMessage}`);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }, [updatePerson]);

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount(String(_id));
            // Optionally update UI after successful deletion

            // Reset confirmation state
            setIsConfirming(false);
            setInputValue('');
            setConfirmationPhrase('');
            setShowOverlay(false);
        } catch (error) {
            console.error('Failed to delete account', error);
            if (axios.isAxiosError(error)) {
                const apiErrorResponse = (error as AxiosError<APIError>).response?.data;
                console.error(`Error ${apiErrorResponse?.statusCode}: ${apiErrorResponse?.errorMessage}`);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    const handleDeleteClick = () => {
        if (isConfirming && inputValue === confirmationPhrase) {
            handleDeleteAccount();
        } else {
            setIsConfirming(true);
            setConfirmationPhrase('DELETE'); // Customize this phrase
            setShowOverlay(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleCancelDelete = () => {
        setIsConfirming(false);
        setInputValue('');
        setConfirmationPhrase('');
        setShowOverlay(false);
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <div className="px-4 py-5">
                <h3 className="text-lg leading-6 font-medium dark:text-gray-100">
                    User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm dark:text-gray-400">
                    This is some information about the user.
                </p>
            </div>
            <div className="grid gap-4 m-4 overflow-hidden shadow-md rounded-b-lg dark:shadow-white sm:grid-cols-10 sm:rounded-lg">
                <div className='flex flex-auto justify-center m-2 p-2 sm:col-span-3'>
                    <div className='flex flex-col items-center'>
                    {avatar && (
                        <img
                            className='w-20 h-20 rounded-lg'
                            src={avatar.url}
                            alt="Avatar"
                        />
                    )}
                    <div className="flex justify-end mt-4">
                        <button
                            type='button'
                            className={`px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md`}
                            onClick={handleDeleteClick}
                        >
                            Delete Account
                        </button>
                        </div>
                    </div>
                </div>
                <div className='sm:col-span-7'>
                    <div className="border-t border-black  px-4 py-5 sm:p-0 dark:border-gray-100">
                        <dl className="sm:divide-y divide-black dark:divide-gray-100">
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium">
                                    User ID :
                                </dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                    {_id}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium">
                                    Full name   :
                                </dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                    {firstName} {lastName}
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium">
                                    Email address   :
                                </dt>
                                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                                    {email}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            {showOverlay && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                        <p className="text-sm mb-4">To confirm deletion, type <strong>DELETE</strong> in the input field:</p>
                        <input
                            type="text"
                            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            placeholder="Type DELETE to confirm"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 mr-2 text-sm font-medium text-white bg-red-600 rounded-md"
                                type='button'
                                onClick={handleDeleteAccount}
                                disabled={inputValue !== 'DELETE'}
                            >
                                Confirm
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md"
                                type='button'
                                onClick={handleCancelDelete}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
