"use client";

import React, { Component } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface MobileMenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default class MobileMenuButton extends Component<MobileMenuButtonProps> {
  render() {
    const { onClick, isOpen } = this.props;
    
    return (
      <IconButton
        onClick={onClick}
        className="md:hidden"
        sx={{ 
          display: { xs: 'inline-flex', md: 'none' },
          color: '#a1a1aa',
          '&:hover': { color: '#ffffff' },
          marginRight: '-4px',
          position: 'relative',
          zIndex: 2000,
        }}
        aria-label="Toggle Menu"
      >
        {isOpen ? <CloseIcon sx={{ fontSize: 28 }} /> : <MenuIcon sx={{ fontSize: 28 }} />}
      </IconButton>
    );
  }
}
