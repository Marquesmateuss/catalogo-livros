export interface Book {
  _id: string;
  title: string;
  author: string;
  status: "Lido" | "Não lido";
}