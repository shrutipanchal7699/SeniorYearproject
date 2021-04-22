import { CART_ADD_ITEM } from "../constants/cartConstants";

// also replaced the if and else .

// itemsInCart --> cartItems
export const cartReducer = (state = {itemsInCart:[]}, action) =>{
    switch(action.type) {
        case CART_ADD_ITEM:
            // item to be added -- const item
            const itemToBeAdded = action.payload;
            // already in the cart -- const existItem
            const itemAlreadyInCart = state.itemsInCart.find( x => x.product === itemToBeAdded.product);
            
            // if the product doesn't  exists in the cart, then add it to as a new item.
            if(!itemAlreadyInCart){
                
                 // adding new items
                 return {...state, 
                    itemsInCart: [...state.itemsInCart, itemToBeAdded]};

            }
            else{
               
                //if the product already exists, then change the item numbers to the current selected one.
                return{
                    ...state,
                    itemsInCart: state.itemsInCart.map( x => x.product ===itemAlreadyInCart.product ? itemToBeAdded : x),
                };
            };
        default:
            return state;
    }
};