window.onload = fetchProducts;

const form = document.getElementById("product-form");
const productList = document.getElementById("products");

// Add product
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const productInput = document.getElementById("product-name");
  const departmentInput = document.getElementById("department");

  const productText = productInput.value;
  const departmentID = parseInt(departmentInput.value);

  if (productText === "") return;

  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: Date.now(),
      productname: productText,
      departmentID: departmentID,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Clear input field and refresh list
      document.getElementById("product-name").value = "";
      fetchProducts();
    })
    .catch((error) =>
      console.error("Error adding product:", error)
    );
});

function fetchProducts() {
  fetch("http://localhost:3000/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      productList.innerHTML = "";
      products.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = product.productname;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.style.marginLeft = "10px";

        deleteBtn.addEventListener("click", () => {
          // Remove from DOM
          li.remove();

          // DELETE from server
          fetch(`http://localhost:3000/products/${product.id}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(() => {
              console.log("Product deleted successfully");
              fetchProducts(); // Refresh list
            })
            .catch((error) =>
              console.error("Error deleting product:", error)
            );
        });

        li.appendChild(deleteBtn);
        productList.appendChild(li);
      });
    })
    .catch((error) => console.error("Fetch error:", error));
}
