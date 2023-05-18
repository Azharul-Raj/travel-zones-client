"use client"
import React,{useState,useCallback} from 'react';
import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar/Avatar';
import MenuItem from '../MenuItem/MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

export default function UserMenu() {
  const registerModal=useRegisterModal();
  const LoginModal=useLoginModal();
  const [isOpen,setIsOpen]=useState(false);

  // const toggleMenu=useCallback(
  //   () => {
  //     setIsOpen(!isOpen)
  //   },
  //   [],
  // )
  
  return (
    <div className='relative'>
        <div className="flex items-center gap-3">
            <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer ">
                Arbnb  your home
            </div>
            <div onClick={()=>setIsOpen(!isOpen)} className="p-4 md:py-1 md:px-2 transition rounded-full gap-3 border-[1px] flex flex-row items-center hover:shadow-md cursor-pointer ">
                <AiOutlineMenu/>
                <div className="hidden md:block">
                  <Avatar/>
                </div>
            </div>
        </div>
        {
          isOpen && <div className="absolute rounded-xl shadow-md w-[40vh] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              <MenuItem label='Login' onClick={LoginModal.onOpen}/>
              <MenuItem label='Sign Up' onClick={registerModal.onOpen}/>
            </div>
          </div>
        }
    </div>
  )
}
