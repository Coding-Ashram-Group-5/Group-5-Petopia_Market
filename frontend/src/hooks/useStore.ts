import create from 'zustand';

interface CartItem {
    productId: number;
    productName: string;
}

interface Store {
    cartItems: CartItem[];
    addProduct: (newProduct: CartItem) => void;
    removeProduct: (productId: number) => void;
}

const useStore = create<Store>((set) => ({
    cartItems: [{
        productId: 1,
        productName: "Kutte ka Patta",
    }],
    addProduct: (newProduct) => {
        set((state) => ({
            cartItems: [...state.cartItems, newProduct]
        }));
    },
    removeProduct: (productId) => {
        set((state) => ({
            cartItems: state.cartItems.filter((product) => product.productId !== productId)
        }));
    }
}));

export default useStore;
