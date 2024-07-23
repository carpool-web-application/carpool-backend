import driverRouter from './driver-route.js';
import riderRouter from './rider-route.js';
import riderOrderRouter from './riderOrder-route.js';
import user from './user-route.js';
import riderReq from './riderReq-route.js';
import payment from './payment-route.js';
 
const route = (app) => {
    app.use('/drivers',driverRouter);
    app.use('/riders',riderRouter);
    app.use('/riderOrders',riderOrderRouter);
    app.use('/userAuths',user);
    app.use('/riderRequest',riderReq);
    app.use('/payment',payment);

}

export default route;