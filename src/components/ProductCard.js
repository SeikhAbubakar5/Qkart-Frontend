import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  const {name,cost,rating,image,_id}=product;
  return (
    <Card className="card sx={{maxWidth:385}}">
      
      <CardMedia component="img" image={image} alt={name} />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography varian="h6" component="div">
          ${cost}
        </Typography>
      <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly/>
      </CardContent>
      
      <CardActions>
        <Button onClick={()=>handleAddToCart(_id)} name="add-to-cart" role="button" fullWidth size="" variant="contained" ><AddShoppingCartOutlined />ADD TO CART</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
