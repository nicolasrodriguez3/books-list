import PropTypes from "prop-types"
import { useContext, useState } from "react"
import { BooksContext } from "../context/BooksContext"
import trashBin from "../assets/trash-bin.svg"
import penSquare from "../assets/pen-square.svg"
import check from "../assets/check.svg"
import FavButton from "./FavButton"

function Book({ eachBook }) {
	const { editBook, deleteBook } = useContext(BooksContext)
	const [editingBook, setEditingBook] = useState(false)
	const [book, setBook] = useState(eachBook)

	const handleInput = (e) => {
		const {name, value} = e.target

		const newBook = {
			...book,
			[name]: value
		}
		setBook(newBook)
	}

	const handleFav = () => {
		const fav = !book.fav
		const newBook = {
			...book,
			fav
		}
		editBook(newBook)
		setBook(newBook)
	}

	const handleEditBook = () => {
		setEditingBook(true)
	}

	const handleSave = (e) => {
		e.preventDefault()
		setEditingBook(false)
		editBook(book)
	}

	const handleDelete = () => {
		setEditingBook(false)
		deleteBook(book)
	}


	if (!editingBook) {
		return (
			<article className="border border-slate-600 rounded p-3 px-4 flex gap-2 items-center">
				<FavButton handleFav={handleFav} fav={book.fav} />
				<div className="flex-grow text-left">
					<span>{book.name}</span> - $<span className="font-bold">{book.price}</span>
				</div>
				<button className="bg-green-700 text-white p-2 rounded hover:bg-green-900" onClick={handleEditBook}><img src={penSquare} width={32}  /></button>
				<button className="bg-red-700 text-white p-2 rounded hover:bg-red-900" onClick={handleDelete}><img src={trashBin} width={32} /></button>
			</article>
		)
	}

	return (
		<>
		<form onSubmit={handleSave} className="border border-slate-600 rounded p-3 px-4 flex gap-2 items-center">
		<div className="flex-grow text-left gap-2 flex">
			<input className="p-2 px-3 border-b border-slate-900" name="name" value={book.name} onChange={handleInput} />
			<input className="p-2 px-3 border-b border-slate-900" name="price" value={book.price} onChange={handleInput} />
		</div>
			<button className="bg-green-700 text-white p-2 rounded hover:bg-green-900" type="submit"><img src={check} width={32} /></button>
			<button className="bg-red-700 text-white p-2 rounded hover:bg-red-900" type="button" onClick={handleDelete}><img src={trashBin} width={32} /></button>
		</form>
		</>
	)
}

Book.propTypes = {
	eachBook: PropTypes.object,
	handleModify: PropTypes.func,
}

export default Book
