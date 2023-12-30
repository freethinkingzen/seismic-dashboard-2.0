import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItemButton, ListItemText } from '@mui/material';

function LocationDialog({ values, selectedValue, open, onClose }) {
  
  const handleLocationClick = (value) => {
    onClose(value);
  };

  const handleDialogClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle>Select a Location</DialogTitle>
      <DialogContent>
        <List>
          {values.map((location) => (
            <ListItemButton
              key={location?.id}
              selected={selectedValue === location}
              onClick={() => handleLocationClick(location)}
            >
              <ListItemText primary={location?.properties?.place} />
            </ListItemButton>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default LocationDialog;
