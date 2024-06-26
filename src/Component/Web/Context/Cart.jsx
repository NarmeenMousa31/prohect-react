import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("usertoken");

  const addToCartContext = async (productId) => {
    try {
      const token = localStorage.getItem("usertoken");
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      toast.success("succesfully added to cart", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getCartContext = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${token}` },
      });
      setCount(data.count);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemContext = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/removeItem`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const incraseQuantityContext = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const decraseQuantityContext = async (productId) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      return data;
    } catch (error) {
      console.log(error);
    }   
  };

  const clearCartContext = async () => {
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, 
      {},
      {
        headers: { Authorization: `Tariq__${token}` },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <CartContext.Provider
      value={{
        addToCartContext,
        getCartContext,
        removeItemContext,
        incraseQuantityContext,
        decraseQuantityContext,
        clearCartContext,
        count,
        setCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
