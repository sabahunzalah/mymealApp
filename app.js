let nextBtn = document.getElementById("nextBtn")
let prevBtn = document.getElementById("prevBtn")
let allDishes = document.querySelectorAll(".dishes")
let searchInput = document.getElementById("serachInput")
let searchBtn = document.getElementById("searchBtn")
let dishVal = document.querySelectorAll(".dishVal")




let count = 0;
let allDishesData = [];
const getData = async (value) => {
    try {
        let datas = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
        let jsonData = await datas.json()
        // console.log(jsonData.meals)
        document.querySelector(".showMeal").innerHTML = ""
        allDishesData = jsonData.meals

        jsonData.meals.forEach(function (data) {
            let div = document.createElement("div");
            // console.log(data)
            div.classList.add("card");
            div.innerHTML = `
    <img src="${data.strMealThumb}" alt="">
           <p>${data.strMeal}</p>
 <button onclick="openModal('${data.idMeal}')">Get Recipe</button> 

           `
            document.querySelector(".showMeal").appendChild(div)
        })

    } catch (error) {
        document.querySelector(".showMeal").innerHTML = "<h1> Meal not found</h1>"
    }
}

searchBtn.addEventListener('click', function () {
    let searchValue = searchInput.value;
    if (searchValue == "") {
        alert("First Search Value")
    } else {
        getData(searchValue)
    }
})
dishVal.forEach(function (dishData) {
    dishData.addEventListener("click", function () {
        getData(dishData.value)
    })
})
allDishes.forEach(function (slide, index) {
    slide.style.left = `${index * 100}%`
})   // we use for each loop with alldishes to iterate all elements

//here we create a function myFun() and apply for each loop on curVal to apply css property transform,translate to rotate slider on x-axis
function myFun() {
    allDishes.forEach(function (curVal) {
        curVal.style.transform = `translateX(-${count * 100}%)`
    })
}
nextBtn.addEventListener("click", function () {
    count++;
    if (count == allDishes.length) {
        count = 0;
    }
    myFun()
})
prevBtn.addEventListener("click", function () {
    count--;
    if (count == -1) {
        count = allDishes.length - 1;
    }
    myFun()
})
function openModal(idMeal) {
    console.log(idMeal, 'idMeal')
    let meal = allDishesData.find(function (data) {
        return data.idMeal == idMeal
    })
    // get all fields where key includes ingredient
    let ingredients = Object.keys(meal).filter(function (key) {
        return key.includes('Ingredient') && meal[key] && meal[key].trim() !== '';
    });
    console.log(meal, 'meal')
    let modal = document.getElementById('customModalBody');
    modal.innerHTML = `
        <div class="modalBody" style="padding: 20px; height: 80vh; overflow-y: auto; text-align: center; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; width: 60vw;">
            <img src="${meal.strMealThumb}" alt="" width="450px" height="450px" style="border-radius: 10px;"/>
            <h3 style="margin: 20px 0px;">${meal.strMeal}</h3>
            <h5 style="margin: 20px 0px; color: #DAA520;">Ingredients</h5>
            <ul style="margin: 20px 0px; text-align: left;">
                ${ingredients.map(function (ingredient) {
        return `<li>${meal[ingredient]}</li>`;
    }
    ).join('')}
            </ul>
            <h5 style="margin: 20px 0px; color: #DAA520;">Instructions</h5>
            <p style="margin: 20px 0px;">${meal.strInstructions}</p>
            <button onclick="closeModal()" style="padding: 10px; border-radius: 5px; background: red; color: #fff; border: none; cursor: pointer;">Close</button>
        </div>
    `
    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

document.getElementById('modalOverlay').addEventListener('click', function (event) {
    if (event.target === this) {
        closeModal();
    }
});


