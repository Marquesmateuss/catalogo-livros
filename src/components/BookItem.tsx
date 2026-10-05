import type { Book } from "../types/Book";

interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
}

function BookItem({ book, onDelete }: BookItemProps) {
  return (
    <div>
      <h3>{book.title}</h3>

      <p>Autor: {book.author}</p>

      <p>Status: {book.status}</p>

      <button onClick={() => onDelete(book._id)}>
        Excluir
      </button>
    </div>
  );
}

export default BookItem;