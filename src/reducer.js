const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    case "REMOVE_ONEITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "INCREASE":
      let tempCartItems1 = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return {
        ...state,
        cartItems: tempCartItems1,
      };
    case "DECREASE":
      let tempCartItems2 = state.cartItems
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return {
        ...state,
        cartItems: tempCartItems2,
      };
    case "GET_TOTALS":
      let { totalMoney, totalAmount } = state.cartItems.reduce(
        (cartTotal, item) => {
          const { price, amount } = item;
          const itemTotal = price * amount;
          cartTotal.totalAmount += amount;
          cartTotal.totalMoney += itemTotal;
          return cartTotal;
        },
        {
          totalMoney: 0,
          totalAmount: 0,
        }
      );
      totalMoney = parseFloat(totalMoney.toFixed(2));
      return { ...state, totalAmount, totalMoney };
    case "LOADING":
      return { ...state, loading: true };
    case "DISPLAY_ITEMS":
      return { ...state, cartItems: action.payload, loading: false };
    case "CHANGE_AMOUNT":
      let tempCart = state.cartItems
        .map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.type === "inc") {
              return { ...item, amount: item.amount + 1 };
            }
            if (action.payload.type === "dec") {
              return { ...item, amount: item.amount - 1 };
            }
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return { ...state, cartItems: tempCart };
    default:
      throw new Error();
  }
};

export default reducer;
