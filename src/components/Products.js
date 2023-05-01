import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import "./Products.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {
  const {enqueueSnackbar}=useSnackbar()
   //Local Storage
   // let token = localStorage.getItem("token");
  //  let username = localStorage.getItem("username");
  //  let balance = localStorage.getItem("balance");

   const [productDetails, setProductDetails] = useState([]);
   const [filteredProducts, setFilteredProducts] = useState([]);
   const [timeoutId, setTimeoutId] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    setIsLoading(true);
    try {
      // GET call
      let response = await axios.get(`${config.endpoint}/products`);
      //Success
      setProductDetails(response.data);
      setFilteredProducts(response.data);
      // Fetch cartItems
      //setCartLoad(true);
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      }
    }
    //End loading
    setIsLoading(false);
  };
  // 1. Fetch Initial products & cart list (API call)
  useEffect(() => {
    performAPICall();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    //Start loading
    setIsLoading(true);
    try {
      // GET call
      let response = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );
      //Success
      setFilteredProducts(response.data);
    } catch (e) {
      // Products not found
      if (e.response) {
        if (e.response.status === 404) {
          setFilteredProducts([]);
        }
        if (e.response.status === 500) {
          enqueueSnackbar(e.response.data.message, { variant: "error" });
          setFilteredProducts(productDetails);
        }
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
    //End loading
    setIsLoading(false);
    } 
    // else {
    //   eneqeueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{variant:"error"});
    // }
    // try{
    //  const response=await axios.get()
    // }
 





  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    let items = event.target.value;
    // [IF true] Clear timoutId
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    // Set timeout & make the API call
    let timeOut = setTimeout(() => {
      performSearch(items);
    }, 500);
    // Update set timeoutId
    setTimeoutId(timeOut);
  };









  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
          className="search-desktop"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          onChange={(e) => debounceSearch(e, timeoutId)}
        />
      </Header>

      {/* Search view for mobiles */}
      <TextField
         className="search-mobile"
         size="small"
         fullWidth
         InputProps={{
           endAdornment: (
             <InputAdornment position="end">
               <Search color="primary" />
             </InputAdornment>
           ),
         }}
         placeholder="Search for items/categories"
         name="search"
         onChange={(e) => debounceSearch(e, timeoutId)}
       />
    
       <Grid container>
        <Grid  item container direction="row"  justifyContent="center" alignItems="center" xs md>

         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
         {isLoading ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              py={10}
            >
              <CircularProgress size={40} />
              <h4>Loading Products...</h4>
            </Box>
          ) : (
            <Grid
              container
              item
              spacing={1}
              direction="row"
              justifyContent="center"
              alignItems="center"
              my={3}
            >
              {filteredProducts.length ? (
                filteredProducts.map((x) => (
                  <Grid item key={x["_id"]} xs={6} md={3}>
                    <ProductCard
                      product={x}
                   //
                    />
                  </Grid>
                ))
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  py={10}
                >
                  <SentimentDissatisfied size={40} />
                  <h4>No products found</h4>
                </Box>
              )}
        </Grid>
          )}
       </Grid> 
      </Grid>
      <Footer />
    </div>
  );
};

export default Products;
