import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type){
        case CART_ADD_ITEM: 
            // action.payload = the item to be added to the cart
            const item = action.payload
            // check if the item is already in the cart
            const existItem = state.cartItems.find(x => x.product === item.product)

            // If the item is in the cart 
            if (existItem){
                return{...state,
                cartItems: state.cartItems.map(x=>
                    x.product === existItem.product ? item : x
                    )
            }
            //If the item is not in the cart, add it to cartItems
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        default:
            return state
    }
}
