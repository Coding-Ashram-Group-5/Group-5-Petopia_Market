import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { _id, firstName, lastName, email, avatar } = usePersonStore();
    const isUserLoggedIn = usePersonStore((state) => state._id);
    const [isConfirming, setIsConfirming] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showOverlay, setShowOverlay] = useState(false);
    const { updatePerson } = usePersonStore(state => ({
        updatePerson: state.updatePerson,
    }));

    useEffect(() => {
        if (!isUserLoggedIn) {
            navigate("/auth");
        }
    }, [isUserLoggedIn, navigate]);

    const fetchData = useCallback(async () => {
        try {
            const { data } = await profile();
            if (data) {
                const { _id, firstName, lastName, email, avatar } = data;

                if (!_id || !lastName || !avatar) {
                    throw new Error('Required Fields are Missing');
                }

                updatePerson(_id, firstName, lastName, email, avatar);
            }
        } catch (error) {
            console.error('Failed to fetch user details', error);
            handleAPIError(error);
        }
    }, [updatePerson]);

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount(String(_id));
            resetDeleteState();
        } catch (error) {
            console.error('Failed to delete account', error);
            handleAPIError(error);
        }
    };

    const handleDeleteClick = () => {
        if (isConfirming && inputValue === 'DELETE') {
            handleDeleteAccount();
        } else {
            setIsConfirming(true);
            setShowOverlay(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleCancelDelete = () => {
        resetDeleteState();
    };

    const resetDeleteState = () => {
        setIsConfirming(false);
        setInputValue('');
        setShowOverlay(false);
    };

    const handleAPIError = (error: unknown) => {
        if (axios.isAxiosError(error)) {
            const apiErrorResponse = (error as AxiosError<APIError>).response?.data;
            console.error(`Error ${apiErrorResponse?.statusCode}: ${apiErrorResponse?.errorMessage}`);
        } else {
            console.error('Unexpected error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 min-h-screen">
            <div className="py-5">
                <h2 className="text-lg font-bold mb-2">Welcome, {firstName} {lastName}!</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
                    We're glad you're here! This is your personal profile page, where you can view your account details, track your activity, and access exclusive features.
                </p>
            </div>
            <div className="grid gap-4 m-4 overflow-hidden shadow-lg rounded-lg dark:shadow-lg sm:grid-cols-10">
                <div className="flex flex-col items-center m-2 p-2 sm:col-span-3">
                    <img
                        className="w-24 h-24 rounded-full border border-gray-300 dark:border-gray-600"
                        src={avatar.url}
                        alt="Avatar"
                    />
                    <button
                        type="button"
                        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        onClick={handleDeleteClick}
                    >
                        Delete Account
                    </button>
                </div>
                <div className="sm:col-span-7">
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-0 dark:border-gray-700">
                        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                            <ProfileDetail label="User ID:" value={_id} />
                            <ProfileDetail label="Full Name:" value={`${firstName} ${lastName}`} />
                            <ProfileDetail label="Email Address:" value={email} />
                        </dl>
                    </div>
                </div>
            </div>
            {showOverlay && <ConfirmationOverlay
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onConfirm={handleDeleteAccount}
                onCancel={handleCancelDelete}
                isDisabled={inputValue !== 'DELETE'}
            />}
        </div>
    );
};

const ProfileDetail = ({ label, value }: { label: string, value: string }) => (
    <dd className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium">{label}</dt>
        <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{value}</dd>
    </dd>
);

const ConfirmationOverlay = ({
    inputValue,
    onInputChange,
    onConfirm,
    onCancel,
    isDisabled
}: {
    inputValue: string,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onConfirm: () => void,
    onCancel: () => void,
    isDisabled: boolean
}) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-yellow-300 p-6 rounded-lg shadow-md max-w-sm dark:bg-gray-900">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-sm mb-4">To confirm deletion, type <strong>DELETE</strong> in the input field:</p>
            <input
                type="text"
                className="dark:text-black :px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                placeholder="Type DELETE to confirm"
                value={inputValue}
                onChange={onInputChange}
            />
            <div className="flex justify-end">
                <button
                    className="px-4 py-2 mr-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    type="button"
                    onClick={onConfirm}
                    disabled={isDisabled}
                >
                    Confirm
                </button>
                <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    type="button"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default Profile;
