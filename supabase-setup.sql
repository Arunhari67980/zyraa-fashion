-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 4.5,
  reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (Optional - disable for testing)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Sample products data
INSERT INTO products (name, description, price, image_url, category, stock, rating, reviews) VALUES
  -- Dresses
  ('Elegant Black Dress', 'Premium black dress perfect for any occasion', 2500, '/pics/black_image1.jpeg', 'dresses', 50, 4.5, 128),
  ('Floral Midi Dress', 'Beautiful floral pattern midi dress', 2200, '/pics/review_image_dress.jpg', 'dresses', 35, 4.7, 89),
  ('White Summer Dress', 'Light and breezy white summer dress', 1800, '/pics/review_image_whitetshirt.jpg', 'dresses', 42, 4.4, 156),
  
  -- Jackets
  ('Leather Jacket', 'Classic leather jacket for all seasons', 3500, '/pics/review_image_jacket.jpg', 'jackets', 25, 4.8, 203),
  ('Denim Jacket', 'Timeless denim jacket', 2800, '/pics/review_image_jacket.jpg', 'jackets', 30, 4.6, 176),
  ('Bomber Jacket', 'Stylish bomber jacket', 3200, '/pics/review_image_jacket.jpg', 'jackets', 20, 4.7, 145),
  
  -- Jeans
  ('Premium Blue Jeans', 'Comfortable premium blue jeans', 1999, '/pics/review_image_jeans.jpg', 'jeans', 60, 4.5, 234),
  ('Black Slim Fit Jeans', 'Stylish black slim fit jeans', 2200, '/pics/review_image_jeans.jpg', 'jeans', 55, 4.6, 198),
  ('Distressed Jeans', 'Trendy distressed denim jeans', 2500, '/pics/review_image_jeans.jpg', 'jeans', 40, 4.4, 167),
  
  -- Pants
  ('Casual Chinos', 'Comfortable casual chino pants', 1800, '/pics/review_image_pants.jpg', 'pants', 45, 4.4, 145),
  ('Formal Trousers', 'Professional formal trousers', 2500, '/pics/review_image_pants.jpg', 'pants', 38, 4.7, 167),
  ('Cargo Pants', 'Utility cargo pants with multiple pockets', 2100, '/pics/review_image_pants.jpg', 'pants', 35, 4.3, 132),
  
  -- Party Wear
  ('Gold Party Gown', 'Stunning gold party gown', 4500, '/pics/review_image_partywear.jpg', 'partywear', 15, 4.9, 87),
  ('Sequined Dress', 'Glamorous sequined party dress', 3800, '/pics/review_image_partywear.jpg', 'partywear', 18, 4.8, 112),
  ('Red Cocktail Dress', 'Elegant red cocktail dress', 4200, '/pics/review_image_partywear.jpg', 'partywear', 12, 4.8, 95),
  
  -- Shorts
  ('Summer Shorts', 'Perfect summer shorts', 1200, '/pics/review_image_shorts.jpg', 'shorts', 70, 4.5, 98),
  ('Denim Shorts', 'Stylish denim shorts', 1500, '/pics/review_image_shorts.jpg', 'shorts', 65, 4.6, 134),
  ('Cargo Shorts', 'Comfortable cargo shorts', 1400, '/pics/review_image_shorts.jpg', 'shorts', 55, 4.4, 112),
  
  -- Skirts
  ('Pleated Skirt', 'Elegant pleated skirt', 1800, '/pics/review_image_skirt.jpg', 'skirts', 40, 4.4, 112),
  ('A-Line Skirt', 'Flattering A-line skirt', 2000, '/pics/review_image_skirt.jpg', 'skirts', 35, 4.7, 145),
  ('Midi Skirt', 'Versatile midi skirt', 1900, '/pics/review_image_skirt.jpg', 'skirts', 38, 4.5, 128),
  
  -- Sweaters
  ('Wool Sweater', 'Cozy wool sweater', 2200, '/pics/review_image_sweater.jpg', 'sweaters', 45, 4.6, 178),
  ('Cardigan Sweater', 'Comfortable cardigan sweater', 2500, '/pics/review_image_sweater.jpg', 'sweaters', 40, 4.5, 156),
  ('Turtleneck Sweater', 'Warm turtleneck sweater', 2300, '/pics/review_image_sweater.jpg', 'sweaters', 42, 4.6, 167),
  
  -- Coats
  ('Winter Coat', 'Warm winter coat', 3500, '/pics/review_image_coat.jpg', 'coats', 30, 4.8, 201),
  ('Trench Coat', 'Classic trench coat', 4000, '/pics/review_image_coat.jpg', 'coats', 25, 4.7, 189),
  ('Pea Coat', 'Stylish pea coat', 3800, '/pics/review_image_coat.jpg', 'coats', 28, 4.7, 175);

-- Verify the data
SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY category;
