// when click submit button
document.getElementById('submit').addEventListener('click', () => {
    const input = document.getElementById('search-input').value;
    // get input data
    nameCall(input);
})

// Name API call
let nameCall = async (input) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
        const category = await response.json()
        // get name list
        if (input === document.getElementById('search-input').value) {
            categorySearchResult(category.meals);
        }
        return category.meals;
    }
    // when can't find any food 
    catch (error) {
        document.getElementById('error').style.display = 'block';
        document.getElementById('find-foods').style.display = 'none';
    }
}
// food list
let categorySearchResult = (meals) => {
    // when find any foods
    document.getElementById('error').style.display = 'none';
    document.getElementById('find-foods').style.display = 'flex';
    // show foods
    const foodItems = document.getElementById('find-foods');
    foodItems.innerHTML = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div onclick = "showDetails('${meal.strMeal}')">
            <img src="${meal.strMealThumb}">
            <h4>${meal.strMeal}</h4>
        </div>    
        `;
        foodItems.appendChild(div);
    });
}
// click for detail
let showDetails = (foodName) => {
    // catch promise
    const foodDetails = nameCall(foodName);
    foodDetails.then(food => {
        const detailsDiv = document.getElementById('food-detail');
        // Exception handling
        if (detailsDiv != '') {
            detailsDiv.innerText = '';
        }
        // food name img and ingredient
        const arrKeys = Object.keys(food[0])
        console.log(arrKeys)
        let i = 1;
        arrKeys.forEach(element => {
            if (element === 'strMealThumb') {
                const img = document.createElement('img');
                img.src = food[0][element];
                detailsDiv.appendChild(img);
            }
            else if (element === 'strMeal') {
                const h1 = document.createElement('h1');
                h1.innerHTML = food[0][element];
                detailsDiv.appendChild(h1);
            }
            else if (element === 'strIngredient1' ||
                    element === 'strIngredient2' ||
                    element === 'strIngredient3' ||
                    element === 'strIngredient4' ||
                    element === 'strIngredient5' ||
                    element === 'strIngredient6' ||
                    element === 'strIngredient7' ||
                    element === 'strIngredient8' ||
                    element === 'strIngredient9' ||
                    element === 'strIngredient10' ||
                    element === 'strIngredient11' ||
                    element === 'strIngredient12' ||
                    element === 'strIngredient13' ||
                    element === 'strIngredient14' ||
                    element === 'strIngredient15' ||
                    element === 'strIngredient16' ||
                    element === 'strIngredient17' ||
                    element === 'strIngredient18' ||
                    element === 'strIngredient19' ||
                    element === 'strIngredient20'
            ) {
                if (food[0][element] != '') {
                    if (food[0][element] != null) {
                        console.log(element)
                        const p = document.createElement('p');
                        p.innerHTML = 'Ingredient ' + i + ' = ' + food[0][element];
                        detailsDiv.appendChild(p);
                        i++;
                    }
                }
            }
        })
    })
}
