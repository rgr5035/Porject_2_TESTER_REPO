// Helper functions to show/hide elements
const show = (el) => {
  el.style.display = "block";
};

// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  // Get references to the description, name, form and list member
  const nameInput = document.getElementById("gift-item-name");
  const descInput = document.getElementById("gift-item-desc");
  const inputForm = document.getElementById("item-input");
  //   const listSelect = document.getElementById("listMemb");

  // const url = "https:/localhost:8080/items?";
  // const id = url.indexOf("listmember_id=") !== -1;
  // console.log(id);


  // Get query parameter
  // const url = window.location.search;
  let itemId;
  let listmemberId;
  let updating = false;

  // Get item data for editing/adding
  const getItemData = (id, type) => {
    const queryUrl = type === "item" ? `/api/items/${id}` : `/api/members/${id}`;

    fetch(queryUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("Success in getting item:", data);

          // Populate the form for editing
          nameInput.value = data.item;
          descInput.value = data.desc;
          listmemberId = data.ListMemberId || data.id;

          // We are updating
          updating = true;
        }
      })
      .catch((err) => console.error(err));
  };

  // If item exists, grab the content of the item
  if (url.indexOf("?giftitem_id=") !== -1) {
    itemId = url.split("=")[1];
    getItemData(itemId, "giftitem");
  }
  // Otherwise if we have a listmember_id in our url, preset the listmember select box to be our list
  else if (url.indexOf("?listmember_id=") !== -1) {
    listId = url.split("=")[1];
  }

  // Event handler for when the item is submitted
  const handleFormSubmit = (e) => {
    
    e.preventDefault();
    console.log(id);
    // Make sure the form isn't empty
    // if (
    //   !nameInput.value.trim() ||
    //   !descInput.value.trim() ||
    // //   !listSelect.value
    // ) {
    //   return;
    // }

    // Object that will be sent to the db
    const newItem = {
      item: nameInput.value.trim(),
      desc: descInput.value.trim(),
      ListMemberId: 7,
    };

    submitItem(newItem);
    // Update an item if flag is true, otherwise create a new one
    if (updating) {
      newItem.id = itemId;
      updateItem(newItem);
    } else {
      submitItem(newItem);
    }
  };

  // Attach an event listener to the form on submit
  inputForm.addEventListener("submit", handleFormSubmit);

  // Submits new item then redirects
  const submitItem = (newItem) => {
    console.log(newItem);
    fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    //   .then(() => {
    //     window.location.href = "/lists";
    //   })
    //   .catch((err) => console.error(err));
  };

});
