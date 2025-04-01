import React,{useEffect, useState} from 'react';
import axios from 'axios';
// import S23 from './S23.jpeg';

const ProductCard = ({product, addToCart})=>{
  return (
    <div className='bg-white shadow-2xl border border-dark-800 rounded-xl overflow-hidden mt-16 max-w-[300px]'>
    <img src={product.thumbnail} alt={product.title} className='w-full h-44 bg-cover p-3'/>
    <div className='px-4 py-2'>
      <h2 className='text-xl font-bold text-gray-800'>{product.title}</h2>
      <p className='text-lg text-gray-600'>{product.description}</p>
    </div>
    <div className='mt-3 flex justify-between items-center p-4'>
      <span className='text-xl font-bold'>${product.price}</span>
      <button onClick={()=>addToCart(product)} className='bg-blue-500 text-xl text-white px-4 py-1 me-6'>Add to Cart</button>
    </div>
  </div>
  );
};

const CartPage = ({cart}) =>{
  return (
    <div className='p-6 bg-gray-100'>
    <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
    {cart.length === 0 ? (<p className='text-2xl text-gray-600'>shopping cart is empty</p>) 
    :(
      cart.map((item)=>(
        <div key={item.id} className='flex justify-between items-center bg-white p-4 rounded shadow mb-3'>
          <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover" />
          <span className="font-semibold">{item.title}</span>
          <span className="text-lg font-bold text-gray-900">${item.price}</span>
        </div>
      ))
    )}
  </div>
  )
}


const Dashboard = () => {
  const [products ,setProducts] = useState([]);
    const [searchItem ,setSearchItem] = useState("");
    const [cart ,setCart] = useState([]);
    const [selectedCategory , setSelectedCategory] = useState("ALL");
    const [sortOrder ,setSortOrder] = useState("");
    const [pageNo ,setPageNo] = useState(1);
    const productsPerPage = 8;

    useEffect(()=>{
        const fetchProducts = async()=>{
            try {
                const response = await axios.get("https://dummyjson.com/products");
                // console.log(response);
                setProducts(response.data.products);
            } catch (error) {
                console.log("data not fetched",error);
            }
        }
        fetchProducts();
    },[])

    const addToCart =(product)=>{
      setCart([...cart,product]);
    }

    const filteredProducts = [...products]
    .filter((product) => product.title.toLowerCase().includes(searchItem.toLowerCase()) &&
        (selectedCategory.toLowerCase() === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase())
      )
    .sort((a,b)=>{
      if(sortOrder === "lowToHigh") return a.price - b.price;
      if(sortOrder === "highToLow") return b.price - a.price;
      return 0;
    });
    
    const totalPages = Math.ceil(filteredProducts.length/productsPerPage);
    const paginatedProducts = filteredProducts.slice((pageNo -1) * productsPerPage , pageNo * productsPerPage);
    
    const handlePrev = () => setPageNo((prev)=> Math.max(prev-1,1));
    const handleNext = () => setPageNo((prev)=> Math.min(prev+1,totalPages));
    const pageNumbers = [...Array(totalPages).keys()].map((i)=>i+1);
    

  return (
    <div>
      {/* navbar */}
      <div className='w-full flex bg-black justify-between items-center px-6 py-4'>
        <div className='px-6 flex flex-row gap-6'>
          <h1 className='text-gray-200 text-5xl font-bold text-center'>FastBuy</h1>
          <input className='bg-white text-xl px-4 py-1' value={searchItem} onChange={(e)=> setSearchItem(e.target.value)} type='text' placeholder='search here ...'/>
        </div>
        
        <div className='flex gap-4 bg-white px-3 py-2 gap-4'>
        <label className='bg-white text-xl '>Category </label>
        <select className='bg-white border border-black' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option className='text-xl value="ALL" '>All</option>
          <option className='text-xl' value="beauty" >beauty</option>
          <option className='text-xl' value="fragrances" >Fragrances</option>
          <option className='text-xl' value="furniture" >Furniture</option>
          <option className='text-xl' value="groceries" >Groceries</option>
        </select>
        </div>

        <div className='flex gap-4 bg-white px-3 py-2 gap-4'>
        <label className='bg-white text-xl'>Sort Price </label>
        <select className='bg-white border border-black' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option className='text-xl'>Normal</option>
          <option className='text-xl'  value="lowToHigh">Low to High</option>
          <option className='text-xl'  value="highToLow">High to Low</option>
        </select>
        </div>

        <div className='ms-6'>
          <button className='px-8 py-1.5 bg-blue-500 text-xl text-white'>Cart {cart.length}</button>
        </div>

      </div>
      {/* Rendering ProductCard Component with dynamic data  */}
            {/* <div className='grid grid-cols-4 justify-center gap-2 p-4'>
         step 1 while only showing api data 
          {products.map((product , index)=>(
            <ProductCard key={index} product={product}/>
          ))}

        step2 while filteredproduct data rendering
        {filteredProducts.length > 0  ? (
          filteredProducts.map((product,index)=>(
            <ProductCard key={index} product={product}/>
          )) 
        ):( 
          <p className="text-center col-span-4 text-gray-500">No products found</p>
        )}
      </div> */}
      <div className='grid grid-cols-4 justify-center gap-2 p-4'>
      {paginatedProducts.map((product)=>(<ProductCard key={product.id} product={product} addToCart={addToCart}/>))}
      </div>
  
      {/* pagination */}
      <div className='flex flex-row justify-center gap-4 p-2'>
        {pageNo > 1 && <button onClick={handlePrev} className='px-2 py-2 bg-black text-white'>Prev</button>}
        {pageNumbers.map((num)=>(<button key={num} onClick={()=>setPageNo(num)} className={`px-3 py-1 mx-1 rounded ${pageNo === num ? "bg-blue-500 text-white" : "bg-gray-300"}`}>{num}</button>))}
        {pageNo < totalPages && <button onClick={handleNext} className='px-2 py-2 bg-black text-white'>Next</button>}
      </div>
 
      <div>
      <CartPage cart={cart} />
      </div>
    </div>

    
  )
}

export default Dashboard