// Wait for the DOM to completely load before we run our JS
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  // Get references to the description, name, form and list member
  const nameInput = document.getElementById("gift-item-name");
  const descInput = document.getElementById("gift-item-desc");
  const inputForm = document.getElementById("item-input");


  const currentUrl = window.location.href
  console.log(currentUrl);
  const id = currentUrl.split('=')[1];
  console.log(id);

  // Event handler for when the item is submitted
  const handleFormSubmit = (e) => {
    
    e.preventDefault();
    console.log(id);

    // Object that will be sent to the db
    const newItem = {
      item: nameInput.value.trim(),
      desc: descInput.value.trim(),
      ListMemberId: id,
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
    })
      .then(() => {
        window.location.href = `/members/${id}`;
      })
    //   .catch((err) => console.error(err));
  };

});