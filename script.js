fetch("https://cataas.com/api/cats")
    .then((response) => {
        return response.json()
    })
    .then((catList) => printCats(catList))

//Creating Searchbar.
const searchBar = document.createElement("div");
searchBar.setAttribute("class", "searchBar");
searchBar.innerHTML = `<p class = "siteHeading">Paws n Furs</p>
<input type = "search"
name = "Search"
id = "searchBox"
placeholder = "Search Cats">
<button type="submit" onclick="searchFunction()" id = "searchButton">Search</button>
`
document.body.append(searchBar)
    // Searchbar Complete.

function printCats(cats) {

    // Creating Overall Layout.
    const catLayout = document.createElement("div")
    catLayout.className = "layout"


    // Running through fetched JSON.
    cats.forEach(cat => {

        // Creating and appending a div box for each cat. 
        const catBox = document.createElement("div")
        catBox.className = "eachCatBox"



        // PopUp to open cat Image On click
        catBox.onclick = () => {
            let url = `https://cataas.com/cat/${cat.id}`
            window.open(url, 'popUpWindow', 'height=500,width=800,left=100,top=100,resizable=yes');
        };

        catBox.innerHTML = `<h2>Cat Id <br><br> ${cat.id}</h2>
                            <h3>Date Created <br><br> ${cat.created_at}</h3>
                            <p>Tag names <br><br>${cat.tags}<p>`



        catLayout.append(catBox)

    });


    document.body.append(catLayout)
}



async function searchFunction() {
    const searchedTag = document.querySelector("#searchBox").value
    let temp = []
    let rawData = await fetch("https://cataas.com/api/cats")
    let jsonData = await rawData.json()
    compareSearch(jsonData);

    function compareSearch(data) {
        data.forEach((cats) => {

            let allTags = cats.tags
            if (allTags.includes(searchedTag)) { temp.push(cats) }
        })

        if (temp.length != 0) {
            document.querySelector(".layout").remove()
            printCats(temp)
        } else {
            alert("Sorry!!!! There is no kitten with this tag")
        }
    }

}
