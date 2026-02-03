import { supabase } from '../lib/supabase'

// Get all products from Supabase
export const getAllProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    if (category === 'all') return getAllProducts()
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// Get a single product by ID
export const getProductById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching product by ID:', error)
    return null
  }
}

// Search products
export const searchProducts = async (query) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
}

// Get new arrivals (latest 6 products)
export const getNewArrivals = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6)
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching new arrivals:', error)
    return []
  }
}

// Get random products
export const getRandomProducts = async (limit = 8) => {
  try {
    // Supabase doesn't have built-in random, so we fetch all and shuffle
    const { data, error } = await supabase
      .from('products')
      .select('*')
    
    if (error) throw error
    
    // Shuffle and return limited results
    const shuffled = (data || []).sort(() => Math.random() - 0.5)
    return shuffled.slice(0, limit)
  } catch (error) {
    console.error('Error fetching random products:', error)
    return []
  }
}

// No longer needed - products are in Supabase
export const initializeProducts = () => {
  console.log('Products are now managed in Supabase')
}
