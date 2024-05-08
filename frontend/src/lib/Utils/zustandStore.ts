import { create } from "zustand";

type State = {
    firstName: string;
    lastName: string;
    email: string;
    avatar: {
        publicId: string;
        url: string;
    };
};

type Action = {
    updatePerson: (
        firstName: State["firstName"],
        lastName: State["lastName"],
        email: State["email"],
        avatar: State["avatar"],
    ) => void;
};

const usePersonStore = create<State & Action>((set) => ({
    firstName: "",
    lastName: "",
    email: "",
    avatar: { publicId: "", url: "" },
    updatePerson: (firstName, lastName, email, avatar) =>
        set(() => ({ firstName, lastName, email, avatar })),
}));

export default usePersonStore;
