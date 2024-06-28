import { create } from "zustand";

type State = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: {
        publicId: string;
        url: string;
    };
    loggedIn: boolean;
};

type Action = {
    updatePerson: (
        _id: State["_id"],
        firstName: State["firstName"],
        lastName: State["lastName"],
        email: State["email"],
        avatar: State["avatar"],
    ) => void;
    setLoggedIn: (loggedIn: boolean) => void;
};

const usePersonStore = create<State & Action>((set) => ({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: { publicId: "", url: "" },
    loggedIn: localStorage.getItem('loggedIn') === 'true',

    updatePerson: (_id, firstName, lastName, email, avatar) => {
        const loggedIn = Boolean(_id);
        localStorage.setItem('loggedIn', loggedIn.toString());
        set({ _id, firstName, lastName, email, avatar, loggedIn });
    },

    setLoggedIn: (loggedIn) => {
        localStorage.setItem('loggedIn', loggedIn.toString());
        set({ loggedIn });
    },
}));

export default usePersonStore;
