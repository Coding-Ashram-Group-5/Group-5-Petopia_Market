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
};

type Action = {
    updatePerson: (
        _id: State["_id"],
        firstName: State["firstName"],
        lastName: State["lastName"],
        email: State["email"],
        avatar: State["avatar"],
    ) => void;
};

const usePersonStore = create<State & Action>((set) => ({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: { publicId: "", url: "" },
    updatePerson: (_id, firstName, lastName, email, avatar) =>
        set(() => ({ _id, firstName, lastName, email, avatar })),
}));

export default usePersonStore;
