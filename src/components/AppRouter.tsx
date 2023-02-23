import React, {FC} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import {privateRoutes, publicRoutes, RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter: FC = () => {
    const {isAuth} = useTypedSelector(state => state.authReducer)
    return (
        <>
            {isAuth ?
                <Routes>
                    {privateRoutes.map(route =>
                        (<Route
                            path={route.path}
                            element={<route.element/>}
                            key={route.path}
                        />)
                    )}
                    <Route path='*' element={<Navigate to={RouteNames.EVENT} />} />
                </Routes>
                :
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            path='/login'
                            element={<route.element/>}
                            key={route.path}
                        />
                    )}
                    <Route path='*' element={<Navigate to={RouteNames.LOGIN} />} />
                </Routes>
            }
        </>
    );
};

export default AppRouter;