import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS, 
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'


export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
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
        case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state,
                paymentMethod: action.payload
            }
        case CART_CLEAR_ITEMS:
            return{
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}
