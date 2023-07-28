import PropTypes from "prop-types"
import { createContext, useEffect, useState } from "react"

export const BooksContext = createContext()
export const BooksContextProvider = ({ children }) => {
	const [books, setBooks] = useState([])

	const addBook = (newBook) => {
		setBooks((prevBooks) => {
			const newBooks = [...prevBooks, newBook]
			saveInLocalStorage(newBooks)
			return newBooks
		})
	}
	const editBook = (bookToEdit) => {
		const booksCopy = books.map((b) => {
			if (b.id === bookToEdit.id) return bookToEdit
			return b
		})
		setBooks(booksCopy)
		saveInLocalStorage(booksCopy)
	}
	const deleteBook = (bookToDelete) => {
		const booksCopy = books.filter((b) => b.id !== bookToDelete.id)
		setBooks(booksCopy)
		saveInLocalStorage(booksCopy)
	}

	const saveInLocalStorage = (toSave) => {
		window.localStorage.setItem("books", JSON.stringify(toSave))
	}
	const getFromLocalStorage = (set) => {
		const books = window.localStorage.getItem("books") || []
		set(JSON.parse(books))
	}

	useEffect(() => {
		getFromLocalStorage(setBooks)
	}, [])

	return (
		<BooksContext.Provider value={{ books, addBook, editBook, deleteBook }}>
			{children}
		</BooksContext.Provider>
	)
}

BooksContextProvider.propTypes = {
	children: PropTypes.object,
}
