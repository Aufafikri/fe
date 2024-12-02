import { create } from 'zustand'

interface ProfileModalState {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useImageProfileModal = create<ProfileModalState>((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false })
}))

// {
//     "name": "Slim Fit T-Shirt",
//     "price": 19.99,
//     "description": "A comfortable slim fit t-shirt made from soft cotton fabric, ideal for everyday wear.",
//     "stock": 50,
//     "category": {
//       "name": "Clothes",
//       "label": "Tops",
//       "type": "T-Shirt",
//       "size": "Medium",
//       "brand": "BasicBrand",
//       "description": "Casual slim fit t-shirts suitable for all seasons."
//     }
//   }
  