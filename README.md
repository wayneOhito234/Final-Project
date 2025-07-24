# Product Tracking System
A simple web application that allows users to add, view, and delete products while associating them with specific departments. It also provides a categorized view of products by department.

## Features

- Add new products with department selection
- View a list of all products
- Delete products
- Grouped view: See products under their respective departments
- Responsive design

---

## 🛠 Tech Stack

- **HTML**, **CSS**, **JavaScript**
- [JSON Server](https://github.com/typicode/json-server) as a mock backend

---

## Requirements


##  Project Structure

```bash
product-tracking-system/
│
├── index.html          # Main HTML UI
├── style.css           # Optional: CSS styling (if separated)
├── src/
│   └── index.js        # All JavaScript logic
├── db.json             # JSON Server database
└── README.md           # You're here!
```
## Installation

1. Clone The repository
```bash
git clone https://github.com/wayneOhito234/Phase1-FinalProject
```

2. Navigate the project directory
```bash
cd Phase1-FinalProject
```
3. Install the JSON Server globally
``` bash
npm install -g json-server
```
4. Start the JSON server
``` bash
json-server --watch db.json --port 3000
```
5. Open The Application
simply open ```bash index.html`` in your browser 
You can now:
Add a product
a)Choose its department

b)View all products

c)View them grouped by department

d) Delete unwanted entries

#### License
This project is licensed under the MIT License.

## Author
Wayne Ohito – @wayneOhito234



