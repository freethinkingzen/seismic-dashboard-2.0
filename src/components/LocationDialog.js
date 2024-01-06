import React, { useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon, 
  Tooltip} from '@mui/material';
import { GpsFixed } from '@mui/icons-material';
import { SeismicDataContext } from '../Context';
import { popupHTML } from '../utils/DataParser';

function LocationDialog({ values, selectedValue, open, onClose }) {
  const context = useContext(SeismicDataContext);

  const handleLocationClick = (value) => {
    if (context.map) {
      context.map.flyTo([value.geometry.coordinates[1], value.geometry.coordinates[0]], 10);
      context.map.openPopup(popupHTML(values[0]), [values[0].geometry.coordinates[1], values[0].geometry.coordinates[0]]);
    }
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
            <React.Fragment key={location?.id + "item"}>
            <Divider />
            <Tooltip title={"See on Map"} placement="bottom">
            <ListItemButton
              key={location?.id}
              selected={selectedValue === location}
              onClick={() => handleLocationClick(location)}
            >
              <ListItemIcon>
                <GpsFixed color="primary" />
              </ListItemIcon>
              <ListItemText primary={location?.properties?.place} />
            </ListItemButton>
            </Tooltip>
            </React.Fragment>
          ))}
          <Divider />
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default LocationDialog;
