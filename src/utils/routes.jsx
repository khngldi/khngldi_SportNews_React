import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Categories from "../pages/Categories";

import {
    HOME_PAGE_ROUTE,
    NEWS_PAGE_ROUTE,
    CATEGORIES_PAGE_ROUTE,
} from "./consts";

export const routes = [
    {
        path: HOME_PAGE_ROUTE,
        element: Home,
    },
    {
        path: NEWS_PAGE_ROUTE,
        element: Detail,
    },
    {
        path: CATEGORIES_PAGE_ROUTE,
        element: Categories,
    },
];