window.onload = () => {
  const form = document.getElementById("product-form");
  const productList = document.getElementById("products");

  // Fetch and display existing products
  fetchProducts();

  // Add product
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const productName = document.getElementById("product-name").value;
    const departmentID = parseInt(document.getElementById("department").value);

    if (!productName) return;

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Date.now(),
        productname: productName,
        departmentID: departmentID,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        form.reset(); // clear form
        fetchProducts(); // refresh list
      })
      .catch((err) => console.error("Error adding product:", err));
  });

  function fetchProducts() {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((products) => {
        productList.innerHTML = "";
        products.forEach((product) => {
          const li = document.createElement("li");
          li.textContent = `${product.productname} (Dept: ${product.departmentID})`;

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "X";
          deleteBtn.addEventListener("click", () => deleteProduct(product.id));

          li.appendChild(deleteBtn);
          productList.appendChild(li);
        });
      })
      .catch((err) => console.error("Fetch error:", err));
  }

  function deleteProduct(id) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchProducts())
      .catch((err) => console.error("Error deleting product:", err));
  }
};
