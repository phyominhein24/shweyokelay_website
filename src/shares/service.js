// import { httpServiceHandler } from "../helpers/handler";
// import { updateNotification } from "../shares/shareSlice";
// import { index, update } from "./routesSlice";
// import { endpoints } from "../constants/endpoints";
// import { getRequest } from "../helpers/api";

// export const Service = {
//     index: async (dispatch, params) => {
//         const response = await getRequest(endpoints.counter, params);
//         await httpServiceHandler(dispatch, response);

//         if (response.status === 200) {
//             dispatch(
//                 index(response.data.data ? response.data.data : response.data)
//             );
//               dispatch(
//                 updateNotification({
//                     variant: "success",
//                     message: response.message,
//                 })
//             );
//         }
//         return response;
//     }
// };
