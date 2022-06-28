import { createContext,useEffect,useReducer } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

const INITIAL_STATE={
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

export const CART_ACTION_TYPES={
  IS_CART_OPEN:'IS_CART_OPEN',
  CART_ITEMS:'CART_ITEMS',
  CART_COUNT:'CART_COUNT',
  CART_TOTAL:'CART-TOTAL'
}

export const cartReducer=(state,action)=>{
  console.log('dispatched');
  console.log(action)
  const {type,payload}=action;
  switch(type){
    case CART_ACTION_TYPES.IS_CART_OPEN:return{
      ...state,
      isCartOpen:payload
    }
    case CART_ACTION_TYPES.CART_ITEMS:return{
      ...state,
      cartItems:payload
    }

    case CART_ACTION_TYPES.CART_COUNT:return{
      ...state,
      cartCount:payload
    }

    case CART_ACTION_TYPES.CART_TOTAL:return{
      ...state,
      cartTotal:payload
    }

    default:
      throw new Error(`unhandled type ${type} in cartReducer`)
  }

}

export const CartProvider = ({ children }) => {

  const [{cartItems,cartCount,cartTotal,isCartOpen},dispatch]=useReducer(cartReducer,INITIAL_STATE);
  
  const setIsCartOpen=(val)=>{
    dispatch({type:CART_ACTION_TYPES.IS_CART_OPEN,payload:val})
  }

  const setCartItems=(val)=>{
    dispatch({type:CART_ACTION_TYPES.CART_ITEMS,payload:val})
  }

  
  const setCartCount=(val)=>{
    dispatch({type:CART_ACTION_TYPES.CART_COUNT,payload:val})
  }

  
  const setCartTotal=(val)=>{
    dispatch({type:CART_ACTION_TYPES.CART_TOTAL,payload:val})
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

    useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity*cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
