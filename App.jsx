import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  About,
  HomeLayout,
  Landing,
  Error,
  NewsLetter,
  Cocktail,
  SinglePageError,
} from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsletterAction } from "./pages/NewsLetter";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
// Define the route configuration for your application

const router = createBrowserRouter([
  {
    // Define the path for this route
    path: "/",
    // Specify the React component to render for this route
    element: <HomeLayout />,
    errorElement: <Error />,
    // Define nested routes for this path
    children: [
      {
        // This route is the default route when the parent path ("/") is matched
        index: true,
        // Render the Landing component when this route is matched
        element: <Landing />,
        errorElement: <SinglePageError />,
        loader: landingLoader(queryClient),
      },
      {
        // Define a path for this nested route
        path: "cocktail/:id",
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        // Render the Cocktail component when this route is matched
        element: <Cocktail />,
      },
      {
        // Define a path for this nested route
        path: "newsletter",
        // Render the NewsLetter component when this route is matched
        element: <NewsLetter />,
        action: newsletterAction,
      },
      {
        // Define a path for this nested route
        path: "about",
        // Render the About component when this route is matched
        element: <About />,
      },
    ],
  },
]);

// Create the main App component
const App = () => {
  // Wrap the entire application with the RouterProvider
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
