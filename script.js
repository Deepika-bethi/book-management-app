// -----------------------------
// Firestore CRUD operations
// -----------------------------

// Fetch and render all books
async function renderBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    try {
        const snapshot = await db.collection("books").get();

        if (snapshot.empty) {
            bookList.innerHTML = "<p>No books found. Add some!</p>";
            return;
        }

        snapshot.forEach(doc => {
            const book = doc.data();
            const id = doc.id;

            const card = document.createElement("div");
            card.className = "book-card";
            card.innerHTML = `
                <img src="${book.coverImageURL}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>Author: <span id="author-${id}">${book.author}</span></p>
                <p>Price: ₹${book.price}</p>
                <button onclick="updateAuthor('${id}')">Update Author</button>
                <button onclick="deleteBook('${id}')">Delete</button>
            `;
            bookList.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

// Add a new book
async function addBook() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const price = parseInt(document.getElementById("price").value);
    const cover = document.getElementById("cover").value.trim();

    if (!title || !author || !price || !cover) {
        alert("Please fill all fields!");
        return;
    }

    try {
        await db.collection("books").add({
            title: title,
            author: author,
            price: price,
            coverImageURL: cover
        });

        // Clear form
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("price").value = "";
        document.getElementById("cover").value = "";

        renderBooks();
    } catch (error) {
        console.error("Error adding book:", error);
    }
}

// Update book author
async function updateAuthor(id) {
    const newAuthor = prompt("Enter new author name:");
    if (!newAuthor) return;

    try {
        await db.collection("books").doc(id).update({ author: newAuthor });
        renderBooks();
    } catch (error) {
        console.error("Error updating author:", error);
    }
}

// Delete a book
async function deleteBook(id) {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
        await db.collection("books").doc(id).delete();
        renderBooks();
    } catch (error) {
        console.error("Error deleting book:", error);
    }
}

// Initial render when page loads
window.addEventListener("DOMContentLoaded", () => {
    renderBooks();
});
