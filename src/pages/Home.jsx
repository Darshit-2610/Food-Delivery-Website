import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Categories from "../Category";
import Card from "../components/card";
import Card2 from "../components/Card2";
import Nav from "../components/Nav";
import { dataContext } from "../context/UserContext";
import { food_items } from "../food";

function Home() {
  let { cate, setCate, input, showCart, setShowCart } = useContext(dataContext);

  //  function filter(category) {
  //   if(category==="All"){
  //     setCate(food_items)
  //   }else{
  //     let newList =  food_items.filter((item) => (item.food_category === category))
  //     setCate(newList)
  //   }
  //  }

  function filter(category) {
    const filteredItems =
      category === "All"
        ? food_items
        : food_items.filter((item) => item.food_category === category);

    setCate(filteredItems);
  }

  let items = useSelector((state) => state.cart);
  let subtotal = items.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  let deliveryFee = 20;
  let taxes = (subtotal * 0.5) / 100;
  let total = Math.floor(subtotal + deliveryFee + taxes);

  return (
    <div className="w-full bg-slate-200 min-h-screen">
      {/* <Nav />
      {!input ? <div className="flex flex-wrap justify-center items-center gap-5 w-[100%]">
        {Categories.map((item) => {
          return (
            <div key={item.name} onClick={ () => filter(item.name)} className="w-[140px] h-[150px] bg-white flex flex-col items-start gap-5 p-5 justify-start text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200 ">
              {item.icon}
              {item.name}
            </div>
          );
        })}
      </div> :  <div>
        <div className="w-full  flex  flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8 ">
          {cate.map((items) => (
            <Card
              name={items.food_name}
              image={items.food_image}
              price={items.price}
              type={items.food_type}
              id = {items.id}
            />
          ))}
        </div>
      </div>} */}

      <Nav />

      {/* Categories show only if there's no input */}
      {!input && (
        <div className="flex flex-wrap justify-center items-center gap-5 w-[100%]">
          {Categories.map((item) => (
            <div
              onClick={() => filter(item.name)}
              className="w-[140px] h-[150px] bg-white flex flex-col items-start gap-5 p-5 justify-start text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200 "
            >
              {item.icon}
              {item.name}
            </div>
          ))}
        </div>
      )}

      {/* Cards always render */}
      <div className="w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8 ">
        {cate.length > 0 ? (
          cate.map((items) => (
            <Card
              key={items.id}
              name={items.food_name}
              image={items.food_image}
              price={items.price}
              type={items.food_type}
              id={items.id}
            />
          ))
        ) : (
          <p className="text-gray-600 text-xl">No food items found.</p>
        )}
      </div>

      {/* cart section  */}
      <div
        className={` w-full md:w-[40vw] h-[100%] fixed top-0 right-0  bg-white shadow-xl p-6 transition-all duration-500 flex  flex-col items-center overflow-auto ${
          showCart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="w-full flex justify-between items-center">
          <span className="text-green-400 text-[18px] font-semibold">
            Order items
          </span>
          <RxCross2
            className="w-[30px] h-[30px] text-green-400 text-[18px] font-semibold cursor-pointer hover:text-gray-600"
            onClick={() => setShowCart(false)}
          />
        </header>

        {items.length > 0 ? (
          <>
            <div className="w-full mt-9 flex  flex-col gap-8  ">
              {items.map((item) => (
                <Card2
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  id={item.id}
                  qty={item.qty}
                />
              ))}
            </div>
            <div className="w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col p-8 gap-2">
              <div className="w-full flex justify-between items-center">
                <span className="text-xl text-gray-600 font-semibold">
                  Subtotal
                </span>
                <span className="text-green-400 font-semibold text-lg">
                  Rs {subtotal} /-
                </span>
              </div>
              <div className="w-full flex justify-between items-center">
                <span className="text-xl text-gray-600 font-semibold">
                  Delivery Fee
                </span>
                <span className="text-green-400 font-semibold text-lg">
                  {" "}
                  Rs {deliveryFee} /-
                </span>
              </div>
              <div className="w-full flex justify-between items-center">
                <span className="text-xl text-gray-600 font-semibold">
                  Taxes
                </span>
                <span className="text-green-400 font-semibold text-lg">
                  Rs {taxes} /-
                </span>
              </div>
            </div>

            <div className="w-full flex justify-between items-center p-9">
              <span className="text-2xl text-gray-600 font-semibold">
                Total
              </span>
              <span className="text-green-400 font-semibold  text-2xl">
                Rs {total} /-
              </span>
            </div>
            <button
              className="w-[80%] p-3 bg-green-400 rounded-lg text-black hover:bg-green-300 transition-all  "
              onClick={() => {
                toast.success("Order Placed.");
              }}
            >
              Place Order
            </button>
          </>
        ) : (
          <div className="text-center text-2xl text-green-500 font-semibold pt-5">
            Empty cart{" "}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
