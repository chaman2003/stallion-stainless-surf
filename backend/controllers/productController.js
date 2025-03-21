// Get all products (placeholder for actual database implementation)
const getProducts = async (req, res) => {
    try {
        // Sample furniture products
        const products = [
            {
                _id: "prod1",
                id: "prod1",
                name: "Modern Leather Sofa",
                description: "Elegant modern sofa with genuine leather upholstery.",
                price: 1299,
                category: "living",
                sofaType: "sectional",
                image: "/images/sofa1.jpg",
                dimensions: "84\"W x 38\"D x 34\"H",
                material: "Leather",
                color: "Brown"
            },
            {
                _id: "prod2",
                id: "prod2",
                name: "Coastal Dining Table",
                description: "Beautiful dining table perfect for coastal homes.",
                price: 899,
                category: "dining",
                image: "/images/table1.jpg",
                dimensions: "72\"L x 38\"W x 30\"H",
                material: "Solid Wood",
                color: "Whitewash"
            },
            {
                _id: "prod3",
                id: "prod3",
                name: "Outdoor Patio Lounger",
                description: "Weather-resistant lounger for your patio or pool area.",
                price: 499,
                category: "outdoor",
                image: "/images/lounger1.jpg",
                dimensions: "78\"L x 28\"W x 15\"H",
                material: "Wicker/Aluminum",
                color: "Beige"
            }
        ];
        
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

module.exports = {
    getProducts
}; 