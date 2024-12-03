-- Create the 'products' table
CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" NUMERIC(10, 2) NOT NULL,
    "rating" NUMERIC(3, 2) NOT NULL, -- average rating of the product
    tags TEXT[] NOT NULL, -- array of tags
    "brand" TEXT, -- optional
    "weight" NUMERIC(10, 2) NOT NULL, -- in a consistent unit
    "dimensions" JSONB NOT NULL, -- JSON for width, height, depth
    "returnPolicy" TEXT NOT NULL,
    "minimumOrderQuantity" INTEGER NOT NULL,
    "images" TEXT[] NOT NULL, -- array of image URLs
    "thumbnail" TEXT NOT NULL, -- single image URL for thumbnail
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- creation timestamp
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);
-- Create the 'reviews' table
CREATE TABLE "reviews" (
    "id" SERIAL PRIMARY KEY,
    "productId" INTEGER NOT NULL REFERENCES "products"("id") ON DELETE CASCADE, -- foreign key to products
    "rating" INTEGER NOT NULL CHECK ("rating" BETWEEN 1 AND 5), -- rating between 1 and 5
    "comment" TEXT NOT NULL,
    "date" DATE NOT NULL, -- review date
    "reviewerName" TEXT NOT NULL,
    "reviewerEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- creation timestamp
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier
    "name" TEXT NOT NULL, -- Full name
    "email" TEXT NOT NULL, -- Unique email address
    "username" TEXT NOT NULL, -- Unique username
    "password" TEXT NOT NULL, -- Password (hashed for security)
    "age" INTEGER NOT NULL CHECK (age > 0), -- Age (must be positive)
    "admin" BOOLEAN DEFAULT FALSE, -- Admin status (default is false)
    "image" TEXT, -- User's profile image URL
    "street" TEXT NOT NULL, -- Street address
    "city" TEXT NOT NULL, -- City
    "state" TEXT NOT NULL, -- State
    "zip" TEXT NOT NULL, -- Zip code
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Creation timestamp
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE "infos" (
    "id" SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier
    "userID" INT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE, -- Foreign key linking to users
    "title" TEXT NOT NULL, -- Title of the info record
    "type" TEXT NOT NULL, -- Type of activity
    "date" DATE NOT NULL, -- Date of the record
    "address" JSONB NOT NULL, -- Address information (street, city, state, zip)
    "image" TEXT, -- Image associated with the info record
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Creation timestamp
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

