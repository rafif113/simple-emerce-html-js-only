let products = [
  {
    id: 157899126121,
    category: "Fast Food",
    name: "Noodle",
    price: 3000,
    stock: 8,
  },
  {
    id: 157899126122,
    category: "Cloth",
    name: "Hoodie",
    price: 150000,
    stock: 12,
  },
  {
    id: 157899126123,
    category: "Electronic",
    name: "Tv",
    price: 2500000,
    stock: 9,
  },
  {
    id: 157899126124,
    category: "Fruit",
    name: "Apple",
    price: 25000,
    stock: 3,
  },
];

const categories = ["All", "Fast Food", "Electronic", "Cloth", "Fruit"];
let carts = [];

// Render Data List
const funRenderList = (index) => {
  const listProduct = products.map((product) => {
    const { id, category, name, price, stock } = product;

    if (id != index) {
      return ` 
          <tr>
              <td>${id}</td>
              <td>${category}</td>
              <td>${name}</td>
              <td>${price}</td>
              <td>${stock}</td>
              <td><input type="button" value="Add" onclick="funAdd(${id})"/></td>
              <td><input type="button" value="Delete" onclick="funDelete(${id})"/></td>
              <td><input type="button" value="Edit" onclick="funEdit(${id})"/></td>
          </tr>`;
    }
    return ` 
    <tr>
        <td>${id}</td>
        <td>${category}</td>
        <td><input type="text" name="" value="${name}" id="nameEdit"/></td>
        <td><input type="text" name="" value="${price}" id="priceEdit"/></td>
        <td><input type="text" name="" value="${stock}" id="stockEdit"/></td>
        <td><input type="button" value="Add" disabled/></td>
        <td><input type="button" value="Save" onclick="funSave(${id})"/></td>
        <td><input type="button" value="Cancel" onclick="funCancel()"/></td>
    </tr>`;
  });

  const listCategory = categories.map((category) => {
    return `<option value="${category}">${category}</option>`;
  });
  //    Data Products
  document.getElementById("render").innerHTML = listProduct.join("");

  //   Data Category
  document.getElementById("categoryFilter").innerHTML = listCategory.join("");
  document.getElementById("categoryInput").innerHTML = listCategory.join("");
};

// Render Cart
const funRenderCart = () => {
  const listCart = carts.map((cart) => {
    const { id, category, name, price } = cart;
    return `
    <tr>
              <td>${id}</td>
              <td>${category}</td>
              <td>${name}</td>
              <td>${price}</td>
              <td><input type="button" value="Delete" onclick="funDeleteCart(${id})"/></td>
          </tr>
    `;
  });
  document.getElementById("carts").innerHTML = listCart.join("");
};

//============================================== Render Add Cart =============================================================
const funAdd = (index) => {
  const selectedProduct = products.find((product) => {
    return product.id == index;
  });
  carts.push(selectedProduct);
  funRenderCart();
};
//============================================== Render Delete =============================================================
const funDelete = (index) => {
  products = products.filter((product) => {
    return product.id != index;
  });
  funRenderList();
};

//============================================== Render Delete =============================================================
const funDeleteCart = (index) => {
  carts = carts.filter((cart) => {
    return cart.id != index;
  });
  funRenderCart();
};
//============================================== Render Edit =============================================================
const funEdit = (index) => {
  funRenderList(index);
};

//============================================== Render Edit =============================================================
const funCancel = (index) => {
  funRenderList();
};

//============================================== Render Save =============================================================
const funSave = (index) => {
  // get elements
  const name = document.getElementById("nameEdit").value;
  const price = document.getElementById("priceEdit").value;
  const stock = document.getElementById("stockEdit").value;

  // Found index
  const found = products.findIndex((product) => {
    return product.id == index;
  });

  // Change data
  products[found] = { ...products[found], name, price, stock };
  funRenderList();
};
//============================================== Render Filter =============================================================

const funRenderFilter = (arr) => {
  const listProduct = arr.map((product) => {
    const { id, category, name, price, stock } = product;
    return ` 
        <tr>
            <td>${id}</td>
            <td>${category}</td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${stock}</td>
        </tr>`;
  });

  //    Data Products
  document.getElementById("render").innerHTML = listProduct.join("");
};

//============================================== Input Data =============================================================
const funInputData = () => {
  // Get Data From HTML
  const name = document.getElementById("nameInput").value;
  const price = parseInt(document.getElementById("priceInput").value);
  const category = document.getElementById("categoryInput").value;
  const stock = document.getElementById("stockInput").value;

  //   Get Id
  const time = new Date();
  const id = time.getTime();

  // Push Data to Array
  products.push({ id, name, price, category, stock });

  // Clean all text box
  document.getElementById("nameInput").value = "";
  document.getElementById("priceInput").value = "";
  document.getElementById("stockInput").value = "";

  // Show The List
  funRenderList();
};

//============================================== Filter Name =============================================================
const funFilterName = () => {
  const keyword = document.getElementById("nameFilter").value;

  // Alur filtering
  const filterResult = products.filter((product) => {
    // lowercase first
    const keywordLow = keyword.toLowerCase();
    const nameLow = product.name.toLowerCase();

    // return boolean
    return nameLow.includes(keywordLow);
  });
  funRenderFilter(filterResult);
};

//============================================== Filter Price =============================================================
const funFilterPrice = () => {
  const min = document.getElementById("min").value;
  const max = document.getElementById("max").value;

  let filterResult = products;

  if (!(min == "" || max == "")) {
    filterResult = products.filter((product) => {
      const { price } = product;
      return price >= min && price <= max;
    });
  }
  funRenderFilter(filterResult);
};
//============================================== Filter Category =============================================================

const funFilterCategory = () => {
  const selectedCategory = document.getElementById("categoryFilter").value;
  let filterResult = products;

  if (selectedCategory == "All") {
    filterResult = products;
  } else {
    filterResult = products.filter((product) => {
      return product.category == selectedCategory;
    });
  }
  funRenderFilter(filterResult);
};

//============================================== Reset Filter =============================================================
const funResetFilter = () => {
  const inputTags = document.getElementsByName("txtFilter");
  for (const input of inputTags) {
    input.value = "";
  }
  funRenderList();
};

funRenderList();
