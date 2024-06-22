import { create } from 'zustand';

// Utility function to load the cart items from localStorage
const loadCartItems = () => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
};

// Utility function to save the cart items to localStorage
const saveCartItems = (cartItems:any) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

interface CartItem {
    _id: string;
    productName: string;
    productImages: { url: string }[];
    productPrice: number;
}

interface Store {
    cartItems: CartItem[];
    addProduct: (newProduct: CartItem) => void;
    removeProduct: (productId: number) => void;
    removeAllProducts: () => void;
}

const useStore = create<Store>((set) => ({
    cartItems: loadCartItems(),
    addProduct: (newProduct) => {
        set((state) => {
            const updatedCartItems = [...state.cartItems, newProduct];
            saveCartItems(updatedCartItems);
            return { cartItems: updatedCartItems };
        });
    },
    removeProduct: (productId:any) => {
        set((state) => {
            const updatedCartItems = state.cartItems.filter((product) => product._id !== productId );
            saveCartItems(updatedCartItems);
            return { cartItems: updatedCartItems };
        });
    },
    removeAllProducts: () => {
        set(() => {
            const updatedCartItems: CartItem[] = [];
            saveCartItems(updatedCartItems);
            return { cartItems: updatedCartItems };
        });
    }
}));

export default useStore;
