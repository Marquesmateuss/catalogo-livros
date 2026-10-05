import { useState } from "react";
import type { FormEvent } from "react";

interface BookFormProps {
  onBookAdded: () => void;
}

function BookForm({ onBookAdded }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<"Lido" | "Não lido">("Não lido");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !author.trim()) {
      return;
    }

    const newBook = {
      title,
      author,
      status,
    };

    try {
      await fetch(
        "https://crudcrud.com/api/1a89624bc94741ce86eaa31ff0f1726a/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        }
      );

      setTitle("");
      setAuthor("");
      setStatus("Não lido");

      onBookAdded();
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div>
        <label>Autor:</label>

        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>

      <div>
        <label>Status:</label>

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as "Lido" | "Não lido")
          }
        >
          <option value="Não lido">Não lido</option>
          <option value="Lido">Lido</option>
        </select>
      </div>

      <button type="submit">
        Adicionar livro
      </button>
    </form>
  );
}

export default BookForm;