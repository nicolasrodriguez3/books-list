import "./App.css"
import { BooksContextProvider } from "./context/BooksContext"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import AddBook from "./components/AddBook"
import ListBooks from "./components/ListBooks"
import ErrorPage from "./error-page"

const router = createBrowserRouter([
	{
		path: "/",
		element: <ListBooks />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/add-book",
		element: <AddBook />,
		errorElement: <ErrorPage />,
	},
])

function App() {
	return (
		<BooksContextProvider>
			<h1 className="text-xl mb-4">Administración de libros</h1>
			
			<RouterProvider router={router} />
		</BooksContextProvider>
	)
}

export default App

