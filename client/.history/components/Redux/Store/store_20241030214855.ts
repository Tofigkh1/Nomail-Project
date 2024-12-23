





const makeStore = () =>
    configureStore({
        reducer: {
            user: userReducer,
            sidebar: sidebarReducer,
            products:productsReducer,
            basket: basketReducer,
            simpleBasket:simpleBasketReducer,
            buttonVisibility: buttonVisibilityReducer,
            // order: orderReducer,
        },
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(
               
            )
        },
      
    });



export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrappe(makeStore);