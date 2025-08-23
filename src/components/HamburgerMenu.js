'use client';
import { useState } from 'react';

const HamburgerMenu = ({ onToggle, isOpen }) => {
  return (
    <button 
      className={`hamburger-menu ${isOpen ? 'open' : ''}`} 
      onClick={onToggle}
      aria-label="メニューを開閉する"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default HamburgerMenu;
