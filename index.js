$(function () {
  loadProducts();
  $("#products").on("click", ".delBtn", handleDeleteProduct);
  $("#addBtn").click(addProduct);
  $("#products").on("click", ".edit-button", openEditProductModal);
  $("#closeEditModal").click(closeEditProductModal);
  $("#saveEditProduct").click(editProduct);
});
function loadProducts() {
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/todos",
    method: "GET",
    error: function (response) {
      var products = $("#products");
      products.empty();
      products.append(
        `<div class="error">Error in loading data, please try again</div>`
      );
    },
    success: function (response) {
      console.log(response);
      var products = $("#products");
      products.empty();
      for (i = 0; i < response.length; i++) {
        var product = response[i];
        products.append(`<div class="allProducts" data-id="${product.id}">
        
        <h3>${product.title}</h3>
        <p>
        <button class ='delBtn'>Delete</button>
        <button class ='editBtn'>Edit</button>
        ${product.completed}</p>
        </div>`);
      }
    },
  });
}

function addProduct() {
  var title = $("#title").val();
  var id = $("#completed").val();
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/todos",
    method: "POST",
    data: { title, id },
    success: function (response) {
      console.log(response);
      $("#title").val("");
      $("#completed").val("");
      loadProducts();
    },
  });
}
function openEditProductModal() {
  var btn = $(this);
  var id = btn.data("id");
  $("#editProductModal").data("id", id);
  $("#editTitle").val("");
  $("#editCompleted").val("");
  $("#editProductModal").show();
}

function closeEditProductModal() {
  $("#editProductModal").hide();
}
function editProduct() {
  var id = $("#editProductModal").data("id");
  var title = $("#editTitle").val();
  var completed = $("#editCompleted").val();

  var updatedData = {
    id,
    title,
    completed,
  };

  $.ajax({
    url: "https://jsonplaceholder.typicode.com/todos/" + id,
    method: "PUT",
    data: updatedData,
    success: function (response) {
      console.log(response);

      var productElement = $(`.product[data-id="${id}"]`);
      productElement.find("h3").text(title);
      productElement.find("p").text(completed);

      $("#editProductModal").hide();
    },
    error: function () {
      console.log("Error in editing product");
    },
  });
}

function handleDeleteProduct() {
  var btn = $(this);
  var parentDiv = btn.closest(".allProducts");
  let id = parentDiv.attr("data-id");
  console.log(id);
  console.log("Delete clicked");
  $.ajax({
    url: "https://jsonplaceholder.typicode.com/todos/" + id,
    method: "DELETE",
    success: function () {
      parentDiv.remove();
    },
  });
}
