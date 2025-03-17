import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GDriveGallery = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Direct file IDs and names from Google Drive
  const imageFiles = [
    // These are example IDs - they need to be replaced with actual file IDs from your Google Drive
    { id: '1EeKC9F0QxKrbBFTicgNDrwa_-haaVs2N', name: 'Sofa Catalogue 1' },
    { id: '1EeKC9F0QxKrbBFTicgNDrwa_-haaVs2N', name: 'Sofa Catalogue 2' },
    { id: '1EeKC9F0QxKrbBFTicgNDrwa_-haaVs2N', name: 'Sofa Catalogue 3' },
    { id: '1EeKC9F0QxKrbBFTicgNDrwa_-haaVs2N', name: 'Sofa Catalogue 4' },
    { id: '1EeKC9F0QxKrbBFTicgNDrwa_-haaVs2N', name: 'Bedroom Set 1' },
    { id: '1EeKC9F0QxKrbBFTicgNDrwa_-haaVs2N', name: 'Bedroom Set 2' }
  ];

  // Fallback images from Unsplash
  const fallbackImages = [
    {
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Luxury Bedroom Set"
    },
    {
      url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Modern Nightstand"
    },
    {
      url: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Elegant Dresser"
    },
    {
      url: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Contemporary Wardrobe"
    },
    {
      url: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Vanity Set"
    },
    {
      url: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      name: "Bedroom Bench"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="pt-32 pb-20">
      {/* Breadcrumb navigation */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-sm text-gray-500 mb-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">Image Gallery</span>
        </div>
      </div>

      {/* Gallery header */}
      <div className="container mx-auto px-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Furniture Collection Gallery</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Browse our exquisite collection of premium stainless steel furniture. Each piece is meticulously crafted 
          to provide both aesthetic appeal and unmatched durability.
        </p>
      </div>

      {/* Image gallery */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Google Drive Images Section */}
            <div className="col-span-full mb-8">
              <h2 className="text-2xl font-serif mb-6 border-b pb-2">Google Drive Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {imageFiles.map((file, index) => (
                  <div key={`drive-${index}`} className="overflow-hidden rounded-lg shadow-lg">
                    <div className="relative pb-[75%]">
                      <img
                        src={`https://drive.google.com/uc?export=view&id=${file.id}`}
                        alt={file.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        onError={(e) => {
                          // If image fails to load, replace with placeholder
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                        }}
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-medium">{file.name}</h3>
                      <p className="text-sm text-gray-500">Google Drive Image</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fallback Images Section */}
            <div className="col-span-full">
              <h2 className="text-2xl font-serif mb-6 border-b pb-2">Sample Furniture Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fallbackImages.map((image, index) => (
                  <div key={`fallback-${index}`} className="overflow-hidden rounded-lg shadow-lg">
                    <div className="relative pb-[75%]">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-medium">{image.name}</h3>
                      <p className="text-sm text-gray-500">Sample Image</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GDriveGallery; 