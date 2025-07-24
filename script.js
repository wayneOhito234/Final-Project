// Department name lookup map
const departmentMap = {
  1: "Project Management",
  2: "Engineering Design",
  3: "Electrical Assembly",
  4: "Mechanical Assembly"
};

// Wait until DOM is fully loaded
window.onload = function () {
  fetchProducts();

  const addButton = document.querySelector("button");
  addButton.addEventListener("click", (event) => {
    event.preventDefault();

    const productInput = document.getElementById("product-name");
    const departmentSelect = document.getElementById("department");

    const productText = productInput.value.trim();
    const departmentID = parseInt(departmentSelect.value);

    if (!productText) return;

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
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json();
      })
      .then(() => {
        productInput.value = "";
        fetchProducts();
      })
      .catch((err) => console.error("Error adding product:", err));
  });
};

// Fetch products and update both list and grouped view
function fetchProducts() {
  fetch("http://localhost:3000/products")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    })
    .then((products) => {
      renderProductList(products);
      renderGroupedProducts(products);
    })
    .catch((err) => console.error("Fetch error:", err));
}

// Render all products as a flat list with delete buttons
function renderProductList(products) {
  const productList = document.getElementById("products");
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.productname} (${departmentMap[product.departmentID]})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";

    deleteBtn.addEventListener("click", () => {
      fetch(`http://localhost:3000/products/${product.id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Delete failed");
          return res.json();
        })
        .then(() => fetchProducts())
        .catch((err) => console.error("Delete error:", err));
    });

    li.appendChild(deleteBtn);
    productList.appendChild(li);
  });
}

// Render grouped display by department
function renderGroupedProducts(products) {
  const groupedDisplay = document.getElementById("departments-display");
  groupedDisplay.innerHTML = "";

  // Group products by departmentID
  const grouped = {};
  products.forEach((product) => {
    if (!grouped[product.departmentID]) {
      grouped[product.departmentID] = [];
    }
    grouped[product.departmentID].push(product.productname);
  });

  // Render each department section
  Object.keys(grouped).forEach((deptId) => {
    const deptName = departmentMap[deptId] || `Department ${deptId}`;
    const section = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = deptName;

    const ul = document.createElement("ul");
    grouped[deptId].forEach((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      ul.appendChild(li);
    });

    section.appendChild(title);
    section.appendChild(ul);
    groupedDisplay.appendChild(section);
  });
}
