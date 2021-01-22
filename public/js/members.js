document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");

    document.querySelectorAll('.delete-btn').forEach(deleteBtn => {
        deleteBtn.addEventListener("click", (e) => {
                e.preventDefault();
                console.log("clicked");

                const id = e.target.getAttribute("data-id");
                console.log(id);

                fetch(`../api/items/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then(() => {
                    console.log("deleted gift item");
                    location.reload();
                })
            });
    });
})