import axios from 'axios';

export const userAndPayment = (userPaymentDetails) => dispatch => {
    axios.post(`/api/user/userDetails`, userPaymentDetails)
        .then(res => {

            // localStorage.removeItem('persist:root')
            // dispatch({
            //     type: REMOVE_ALL_ITEMS,
            //     payload: []
            // })
            // history.push('/');

        })

}
