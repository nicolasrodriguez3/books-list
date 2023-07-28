import { useContext, useState } from "react"
import { BooksContext } from "../context/BooksContext"
import { Link } from "react-router-dom"

export default function AddBook() {
	const { books, addBook } = useContext(BooksContext)
	const [error, setError] = useState(false)
	const [savedBook, setSavedBook] = useState(false)

	const [book, setBook] = useState({
		name: "",
		price: "",
		fav: false
	})

	const handleInput = ({ target }) => {
		const { name, value } = target
		setBook((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const { name, price } = book

		if (name === "" || price === "") {
			setError("Por favor, rellene todos los campos")
			return
		}

		setError(false)
		const newBook = {
			id: books.length,
			name,
			price,
		}
		addBook(newBook)
		setBook({
			name: "",
			price: "",
		})
		setSavedBook(true)
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className={`${error ? "error" : ""} flex gap-2 items-center flex-col`}>
				<div className="flex gap-2">
					<label htmlFor="name">
						<input
							className="border border-slate-950 p-2 px-4 rounded "
							type="text"
							id="name"
							name="name"
							placeholder="Nombre"
							value={book.name}
							onChange={handleInput}
							required
						/>
					</label>
					<label htmlFor="price">
						<input
							className="border border-slate-950 p-2 px-4 rounded"
							type="text"
							id="price"
							name="price"
							placeholder="Precio"
							value={book.price}
							onChange={handleInput}
						/>
					</label>
				</div>

				<button className="border bg-slate-950 text-white p-2 px-6 rounded hover:bg-slate-800 transition-colors">
					Guardar
				</button>
			</form>
			{error && <p className="text-red-500">{error}</p>}
			{savedBook && (
				<p className="text-green-500">
					Guardado correctamente <Link to="/">Volver</Link>
				</p>
			)}
		</>
	)
}
