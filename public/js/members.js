document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");


    let giftItems;

    const getgiftItems = (listmember) => {
        listmemberId = listmember || '';

        if (listmemberId) {
            listmemberId = `/?listmember_id=${listmemberId}`;
        }

        fetch (`/api/members${listmemberId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) =>{
            giftItems = data;
            console.log("success in getting gift items:", data);
        })
    };


    const url = window.location.search;
    let listmemberId;
    
    if (url.indexOf('?listmember_id=') !== -1) {
        listmemberId = url.split('=')[1];
        getgiftItems();
    } else {
        getgiftItems();
    }

})