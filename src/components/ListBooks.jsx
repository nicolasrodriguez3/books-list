import PropTypes from "prop-types"
import { useContext, useEffect, useState } from "react"
import Book from "./Book"
import { BooksContext } from "../context/BooksContext"
import { Link } from "react-router-dom"

function ListBooks() {
	const { books } = useContext(BooksContext)
	const [listOfBooks, setListOfBooks] = useState(books)
	const [filterBooks, setFilterBooks] = useState(false)

	const handleFilter = () => {
		filterBooks
			? setListOfBooks((books) => books.filter((book) => book.fav))
			: setListOfBooks(books)

		window.localStorage.setItem("favs", filterBooks)
	}

	useEffect(handleFilter, [filterBooks, books])
	

	if (books.length === 0) {
		return (
			<section>
				<div className="text-xl mb-4">No hay libros agregados</div>
				<Link
					to="/add-book"
					className="border bg-slate-950 text-white p-2 px-6 rounded hover:bg-slate-800 transition-colors inline-block">
					Agregar libro
				</Link>
			</section>
		)
	}

	return (
		<section className="flex flex-col gap-4 max-w-xl mx-auto">
			<Link
				to="/add-book"
				className="border bg-slate-950 text-white p-2 px-6 rounded hover:bg-slate-800 transition-colors inline-block">
				Agregar libro
			</Link>
			<section>
				<div>Filtrar</div>
				<input
					type="checkbox"
					name="favs"
					id="favs"
					onChange={() => setFilterBooks(!filterBooks)}
				/>
				<label htmlFor="favs">Favoritos</label>
			</section>
			{listOfBooks?.map((book) => (
				<Book
					key={book.id}
					eachBook={book}
				/>
			))}
		</section>
	)
}

ListBooks.propTypes = {
	books: PropTypes.array,
	handleBooks: PropTypes.func,
}

export default ListBooks
