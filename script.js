// Fetch and render books
async function renderBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    const snapshot = await db.collection("books").get();
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
}

// Add new book
async function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const price = parseInt(document.getElementById("price").value);
    const cover = document.getElementById("cover").value;

    if (!title || !author || !price || !cover) {
        alert("Fill all fields");
        return;
    }

    await db.collection("books").add({ title, author, price, coverImageURL: cover });
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("price").value = "";
    document.getElementById("cover").value = "";
    renderBooks();
}

// Update author
async function updateAuthor(id) {
    const newAuthor = prompt("Enter new author name:");
    if (!newAuthor) return;
    await db.collection("books").doc(id).update({ author: newAuthor });
    renderBooks();
}

// Delete book
async function deleteBook(id) {
    await db.collection("books").doc(id).delete();
    renderBooks();
}

// Initial render
renderBooks();
