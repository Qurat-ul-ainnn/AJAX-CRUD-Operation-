$(function () {
  loadUsers();
  $("#users").on("click", ".delBtn", handleDeleteUser);
  $("#addBtn").click(addUsers);
  $("#users").on("click", ".edit-button", openEditUserModal);
  $("#closeEditModal").click(closeEditUserModal);
  $("#saveEditUser").click(editUser);
});
function loadUsers() {
  $.ajax({
    url: "https://fakestoreapi.com/users",
    method: "GET",
    error: function (response) {
      var users = $("#users");
      users.empty();
      users.append(
        `<div class="error">Error in loading data, please try again</div>`
      );
    },
    success: function (response) {
      console.log(response);
      var users = $("#users");
      users.empty();
      for (i = 0; i < response.length; i++) {
        var user = response[i];
        users.append(`<div class="allUsers" data-id="${user.id}">
        
        <h3>${user.name.firstname}</h3>
        <p>
        <button class ='delBtn' data-id="${user.id}">Delete</button>
        <button class ='editBtn' data-id="${user.id}">Edit</button>
        ${user.email}</p>
        </div>`);
      }
    },
  });
}

function addUsers() {
  var name = $("#nameInput").val();
  var email = $("#emailInput").val();
  $.ajax({
    url: "https://fakestoreapi.com/users",
    method: "POST",
    data: { name, email },
    success: function (response) {
      console.log(response);
      $("#titleInput").val("");
      $("#completedInput").val("");
      loadUsers();
    },
  });
}
function openEditUserModal() {
  var btn = $(this);
  var id = btn.data("id");
  $("#editUserModal").data("id", id);
  $("#editName").val("");
  $("#editEmail").val("");
  $("#editUserModal").show();
}

function closeEditUserModal() {
  $("#editUserModal").hide();
}
function editUser() {
  var id = $("#editUserModal").data("id");
  var name = $("#editName").val();
  var email = $("#editEmail").val();

  var updatedData = {
    id,
    name,
    email,
  };

  $.ajax({
    url: "https://fakestoreapi.com/users/" + id,
    method: "PUT",
    data: updatedData,
    success: function (response) {
      console.log(response);

      var userElement = $(`.allUsers[data-id="${id}"]`);
      userElement.find("h3").text(name);
      userElement.find("p").text(email);

      $("#editUserModal").hide();
    },
    error: function () {
      console.log("Error in editing User");
    },
  });
}

function handleDeleteUser() {
  var btn = $(this);
  var parentDiv = btn.closest(".allUsers");
  let id = parentDiv.attr("data-id");
  console.log(id);
  console.log("Delete clicked");
  $.ajax({
    url: "https://fakestoreapi.com/users/" + id,
    method: "DELETE",
    success: function () {
      parentDiv.remove();
    },
  });
}
