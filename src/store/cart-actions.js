import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';

//thunk
//a function that return a function that performs an action
export const sendCartData = (cart) => {
    return async (dispatch) => {
        //before calling dispatch we can perform async side effects tasks
        //bbecause we yet not reached the reducer
        dispatch(uiActions.setNotification({
            status: 'Pending',
            title: 'Sending in progress',
            message: 'Sending cart data to server...'
        }));

        const sendRequest = async () => {
            const responce = await fetch('https://react-redux-learn-295d7-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        cartItems: cart.cartItems,
                        totalQuantity: cart.totalQuantity,
                    })
                }
            );

            if (!responce.ok) {
                throw new Error('Sending cart data failed!');
            }
        }

        try {
            await sendRequest();
            dispatch(uiActions.setNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart data sent to server!'
            }))
        }
        catch (error) {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data to server failed'
            }))
        }

    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        dispatch(uiActions.setNotification({
            status: 'Pending',
            title: 'Fetching in progress',
            message: 'Fetching cart data from server...'
        }));

        const fetchRequest = async () => {
            const responce = await fetch('https://react-redux-learn-295d7-default-rtdb.firebaseio.com/cart.json');

            if (!responce.ok) {
                throw new Error('Fetching cart data failed!');
            }

            const data = await responce.json();
            return data;
        }

        try {
            const data = await fetchRequest();
            dispatch(uiActions.setNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart data fetched from server!'
            }))
            dispatch(cartActions.replaceCart({
                cartItems: data.cartItems || [],
                totalQuantity: data.totalQuantity,
            }));
        }
        catch (error) {
            dispatch(uiActions.setNotification({
                status: 'error',
                title: 'Error!',
                message: 'Fetching cart data from server failed'
            }))
        }

    }
}
