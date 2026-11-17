import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const books = [
  { id: "b1", title: "Atomic Habits", author: "James Clear", category: "Self Development", description: "A practical guide to building good habits and breaking bad ones.", totalCopies: 4, availableCopies: 2, year: 2018 },
  { id: "b2", title: "Clean Code", author: "Robert C. Martin", category: "Technology", description: "A handbook of agile software craftsmanship.", totalCopies: 2, availableCopies: 0, year: 2008 },
  { id: "b3", title: "The Pragmatic Programmer", author: "Andrew Hunt and David Thomas", category: "Technology", description: "Practical approaches to becoming a better software developer.", totalCopies: 3, availableCopies: 1, year: 1999 },
  { id: "b4", title: "Deep Work", author: "Cal Newport", category: "Productivity", description: "Rules for focused success in a distracted world.", totalCopies: 3, availableCopies: 3, year: 2016 },
  { id: "b5", title: "The Psychology of Money", author: "Morgan Housel", category: "Finance", description: "Timeless lessons on wealth, greed, and happiness.", totalCopies: 2, availableCopies: 0, year: 2020 },
  { id: "b6", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Technology", description: "The fundamentals of reliable, scalable, and maintainable systems.", totalCopies: 2, availableCopies: 1, year: 2017 }
];

// Existing catalog APIs. Reservation and waitlist APIs are intentionally not implemented.
app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "BookNest API" }));

app.get("/api/books", (req, res) => {
  const q = String(req.query.q || "").trim().toLowerCase();
  const category = String(req.query.category || "All");
  const result = books.filter(book => {
    const matchesQuery = !q || book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q);
    const matchesCategory = category === "All" || book.category === category;
    return matchesQuery && matchesCategory;
  });
  res.json(result);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find(item => item.id === req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`BookNest API running on http://localhost:${PORT}`));
