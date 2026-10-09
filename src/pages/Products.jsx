import React from "react";
import { AddRounded, DeleteOutlineRounded, EditRounded } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";

const initialProducts = [
  { id: 1, name: "Pro Workspace", category: "SaaS", price: "₹2,499", stock: 84, rating: 4.8 },
  { id: 2, name: "Analytics Suite", category: "Analytics", price: "₹4,999", stock: 42, rating: 4.7 },
  { id: 3, name: "Team Package", category: "Business", price: "₹7,499", stock: 26, rating: 4.9 },
  { id: 4, name: "Starter Kit", category: "SaaS", price: "₹999", stock: 120, rating: 4.5 },
];

export default function Products({ onNotice }) {
  const [products, setProducts] = useState(initialProducts);
  const remove = id => { setProducts(products.filter(p => p.id !== id)); onNotice("Product removed"); };

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
        <Box><Typography variant="h4">Products</Typography><Typography color="text.secondary">Manage your product catalog.</Typography></Box>
        <Button variant="contained" startIcon={<AddRounded />} onClick={() => onNotice("Product form opened")}>Add Product</Button>
      </Box>
      <Grid container spacing={2.2}>
        {products.map(p => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={p.id}>
            <Card sx={{ height: "100%" }}>
              <Box sx={{ height: 130, display: "grid", placeItems: "center", background: "linear-gradient(135deg, rgba(124,77,255,.25), rgba(0,191,166,.18))" }}>
                <Typography variant="h4" fontWeight={900}>{p.name.split(" ").map(x=>x[0]).join("")}</Typography>
              </Box>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="start">
                  <Box><Typography variant="h6">{p.name}</Typography><Typography variant="body2" color="text.secondary">{p.category}</Typography></Box>
                  <Chip label={`${p.rating} ★`} size="small" color="warning" variant="outlined" />
                </Stack>
                <Typography variant="h5" sx={{ mt: 2 }}>{p.price}</Typography>
                <Typography variant="body2" color="text.secondary">Stock: {p.stock} units</Typography>
                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
                  <IconButton><EditRounded fontSize="small" /></IconButton>
                  <IconButton color="error" onClick={() => remove(p.id)}><DeleteOutlineRounded fontSize="small" /></IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}