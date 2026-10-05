import { useState } from "react";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleBookAdded = () => {
    setRefresh((current) => current + 1);
  };

  return (
    <div>
      <h1>📚 Catálogo de Livros</h1>

      <BookForm onBookAdded={handleBookAdded} />

      <hr />

      <BookList refresh={refresh} />
    </div>
  );
}

export default App;