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
  const departmentMap = {
  1: "Project Management",
  2: "Engineering Design",
  3: "Electrical Assembly",
  4: "Mechanical Assembly"
};

function renderGroupedProducts(products) {
  const groupedDisplay = document.getElementById("departments-display");
  groupedDisplay.innerHTML = "";

  // Group products by departmentID
  const grouped = {};

  products.forEach(product => {
    if (!grouped[product.departmentID]) {
      grouped[product.departmentID] = [];
    }
    grouped[product.departmentID].push(product.productname);
  });

  // Render each department section
  Object.keys(grouped).forEach(deptId => {
    const deptName = departmentMap[deptId] || `Department ${deptId}`;
    const section = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = deptName;

    const ul = document.createElement("ul");
    grouped[deptId].forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      ul.appendChild(li);
    });

    section.appendChild(title);
    section.appendChild(ul);
    groupedDisplay.appendChild(section);
  });
}

};
