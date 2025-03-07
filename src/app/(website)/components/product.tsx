import React, { useState, useEffect } from "react";
import { categorydata, fetchProductsByCategory } from "@/services/admin/admin-service";  // Ensure you have this function defined
import { Card, CardContent, Typography, List, ListItem, ListItemText, CircularProgress, Button, Container } from '@mui/material';
import Image from 'next/image';

const ProductPage: React.FC = () => {
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await categorydata(""); // Fetch category data
        console.log("Fetched categories:", response.data);  // Log the category data
        const categories = response.data.map((category: any) => ({
          _id: category._id,  // Corrected to use _id instead of id
          name: category.Name,
        }));
        setCategoryList(categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  // Fetch products whenever the selected category changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (selectedCategory) {
        console.log("Fetching products for category:", selectedCategory); // Log the selected category

        // Clear the products state to avoid appending data
        setProducts([]);


        try {
          const response = await fetchProductsByCategory(selectedCategory); // Fetch products by category
          console.log("Fetched products:", response.data); // Log the fetched products
          setProducts(response.data); // Set the fetched products to state
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [selectedCategory]); // This effect runs when the selected category changes

  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        {/* Categories on the left */}
        <div style={{ width: "25%", padding: "20px" }}>
          <Typography variant="h5" gutterBottom>Categories</Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <List>
              {categoryList.map((category) => (
                <ListItem
                  key={category._id}
                  component="button"
                  onClick={() => setSelectedCategory(category._id)}
                  style={{
                    backgroundColor: category._id === selectedCategory ? "#f0f0f0" : "transparent",
                    borderRadius: "5px",
                    marginBottom: "10px",
                    padding: "10px",
                  }}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          )}
        </div>

        {/* Products on the right */}
        <div style={{ width: "70%", padding: "20px" }}>
          <Typography variant="h4" gutterBottom>Products</Typography>
          <div>
            {products.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                {products.map((product: any) => (
                  <Card key={product._id} style={{ maxWidth: 345 }}>
                    <Image src={product.Image} width="100" height="100" alt={product.Name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                    <CardContent>
                      <Typography variant="h6">{product.Name}</Typography>
                      <Typography variant="body2" color="textSecondary" gutterBottom>{product.description}</Typography>
                      <Button variant="contained" color="primary" fullWidth>View Product</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Typography>No products found for this category.</Typography>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
