window.onload = fetchProducts; // Fetch products when the page loads
const form = document.getElementById("create-product-form");
const productList = document.getElementById("Products"); // FIXED

// Add event listener to form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page refresh

  // Get the input value
  const productInput = document.getElementById("new-product-description");
  const productText = productInput.value;

  const departmentMap = {
    1: "Project Management",
    2: "Engineering Design",
    3: "Mechanical Assembly",
    4: "Electrical Assembly",
    5: "Quality Control",
  } 

  if (productText === "") return; // Ignore empty submissions
  fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: Date.now(), // Use current timestamp as a unique ID
      name: productText,
      departmentId: 1,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("new-product-description").value = ""; // Clear input field
      fetchProducts(); // Refresh the product list
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // Clear the input field
  productInput.value = "";
});

// Fetch existing products from the server and display them
function fetchProducts() {
  fetch("http://localhost:3000/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      productList.innerHTML = ""; // Clear existing list items
      products.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = product.name; // FIXED


        // Optional: Add a delete button to each product
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.addEventListener("click", () => {
          li.remove();

          //   Delete product from the server
          fetch(`http://localhost:3000/products/${product.id}`, {
            method: "DELETE",
          })
            .then((response) => {
              console.log(response);
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(() => {
              console.log("Product deleted successfully");
              fetchProducts(); // Refresh the product list
            })
            .catch((error) => {
              console.error(
                "There was a problem with the fetch operation:",
                error
              );
            });
        });

        li.appendChild(deleteBtn);
        productList.appendChild(li); // Add existing product to the list
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
