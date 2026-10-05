import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import BookItem from "./BookItem";

interface BookListProps {
  refresh: number;
}

function BookList({ refresh }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://crudcrud.com/api/1a89624bc94741ce86eaa31ff0f1726a/books"
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar livros");
      }

      const data: Book[] = await response.json();

      setBooks(data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(
        `https://crudcrud.com/api/1a89624bc94741ce86eaa31ff0f1726a
/books/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchBooks();
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refresh]);

  if (loading) {
    return <p>Carregando livros...</p>;
  }

  return (
    <div>
      <h2>Livros cadastrados</h2>

      {books.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default BookList;