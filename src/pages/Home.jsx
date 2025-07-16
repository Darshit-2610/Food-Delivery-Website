import React , { useContext, useState } from "react";
import Categories from "../Category";
import Card from "../components/card";
import Nav from "../components/Nav";
import { food_items } from "../food";
import { dataContext } from "../context/UserContext";

function Home() {
let {cate ,setCate} = useContext(dataContext)


//  function filter(category) {
//   if(category==="All"){
//     setCate(food_items)
//   }else{
//     let newList =  food_items.filter((item) => (item.food_category === category))
//     setCate(newList)
//   }
//  }

function filter(category) {
  const filteredItems = category === "All"
    ? food_items
    : food_items.filter(item => item.food_category === category);
  
  setCate(filteredItems);
}


  return (
    <div className="w-full bg-slate-200 min-h-screen">
      <Nav />
      <div className="flex flex-wrap justify-center items-center gap-5 w-[100%]">
        {Categories.map((item) => {
          return (
            <div onClick={ () => filter(item.name)} className="w-[140px] h-[150px] bg-white flex flex-col items-start gap-5 p-5 justify-start text-[20px] font-semibold text-gray-600 rounded-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200 ">
              {item.icon}
              {item.name}
            </div>
          );
        })}
      </div>
      <div>
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
      </div>
    </div>
  );
}

export default Home;
