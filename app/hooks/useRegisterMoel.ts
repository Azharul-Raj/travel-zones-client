import {create} from 'zustand';
interface registerModalStoreProps{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}

const useRegisterModal=create<registerModalStoreProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useRegisterModal;