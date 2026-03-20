export const notificationReducer = (state, action) => {
    switch(action.type){
        case 'notify':  
            return action.payload;
        case 'clearNotification':
        default:
            return '';
    }
}

