"use client";
import { useState, useEffect } from "react";

async function fetchMealIdeas(ing) {
    if (ing) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
        const data = await response.json();
        if (!data.meals) {
            return [{"strMeal": `No recipes found for ${ing}`}];
        }
        return data.meals;
    } else {
        return [{"strMeal": "Please choose an item to see the meal plans!"}];
    }
}

const MealIdeas = ({ ingredient }) => {
    const [meals, setMeals] = useState([]);

    const loadMealIdeas = async (ingredient) => {
        const mealData = await fetchMealIdeas(ingredient);
        setMeals(mealData);
    };

    useEffect(() => {loadMealIdeas(ingredient)},[ingredient]);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full font-bold py-2 px-4">
                <h1 className="text-3xl">Meal Ideas</h1>
            </div>
            <div className="w-full py-2 px-4 my-2">
                <ol>
                    {meals.map((meal, index) => {
                        return (
                            <li className="bg-stone-900 text-l my-2 p-4 rounded-lg" key={index}>
                                {meal.strMeal}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
};

export default MealIdeas;
