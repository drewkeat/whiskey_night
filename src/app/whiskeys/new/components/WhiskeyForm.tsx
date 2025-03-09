'use client'

import { useState } from 'react';
import { Box, Button, TextField, MenuItem, Slider, Typography } from '@mui/material';
import { supabaseClient} from '@/utils/supabase/client';

const supabase = supabaseClient;

const whiskeyTypes = [
  "American Single Malt", "Blended", "Blended Malt", "Bourbon", "Corn", "Flavored Whiskey", 
  "Other Whiskey", "Rye", "Single Grain", "Single Malt", "Single Pot Still", 
  "Tennessee Whiskey", "White"
];

const flavorProfileOptions = [
  "oily", "rich", "tart", "briny", "peaty", "salty", "smoky", "spicy", "sweet", 
  "floral", "fruity", "herbal", "vanilla", "full_bodied"
];

export default function WhiskeyForm() {
  interface FormData {
    name: string;
    type: string;
    distillery: string;
    location: string;
    description: string;
    whiskeyImage: string;
    listingOnDistiller: string;
    age: string;
    abv: string;
    caskType: string;
    flavorProfile: { [key: string]: number };
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: '',
    distillery: '',
    location: '',
    description: '',
    whiskeyImage: '',
    listingOnDistiller: '',
    age: '',
    abv: '',
    caskType: '',
    flavorProfile: flavorProfileOptions.reduce((acc, flavor) => ({ ...acc, [flavor]: 0 }), {})
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (flavor: string, value: number) => {
    setFormData({ 
      ...formData, 
      flavorProfile: { ...formData.flavorProfile, [flavor]: value } 
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      >
        {whiskeyTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
        <MenuItem value="new">Add New Type</MenuItem>
      </TextField>
      <TextField
        label="Distillery"
        name="distillery"
        value={formData.distillery}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Whiskey Image (URL)"
        name="whiskeyImage"
        value={formData.whiskeyImage}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Listing on Distiller? (URL)"
        name="listingOnDistiller"
        value={formData.listingOnDistiller}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Age"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="ABV"
        name="abv"
        value={formData.abv}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Cask Type"
        name="caskType"
        value={formData.caskType}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Box>
        <Typography variant="h6">Flavor Profile</Typography>
        {flavorProfileOptions.map((flavor) => (
          <Box key={flavor} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Typography sx={{ width: '100px' }}>{flavor}</Typography>
            <Slider
              value={formData.flavorProfile[flavor]}
              onChange={(e, value) => handleSliderChange(flavor, value as number)}
              step={5}
              marks
              min={0}
              max={100}
              valueLabelDisplay="auto"
              sx={{ flexGrow: 1 }}
            />
          </Box>
        ))}
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}