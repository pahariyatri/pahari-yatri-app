import { getAllBooks } from "@/lib/keystatic/getLibraryData";
import BooksClientPage from "./client-page";

export default async function Books() {
  const books = await getAllBooks();
  return <BooksClientPage books={books} />;
}
