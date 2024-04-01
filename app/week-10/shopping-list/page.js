"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import React, { useState, useEffect } from "react";
import MealIdeas from "./meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";
import { useUserAuth } from "../_utils/auth-context";

const Page = () => {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const [items, setItems] = useState(itemsData);
    const [selectedItem, setSelectedItem] = useState('');
    const [mealIdeas, setMealIdeas] = useState("Select an item to see meal ideas");

    const loadItems = async () => {
        if (user) {
            const itemsData = await getItems(user.uid);
            setItems(itemsData);
        }
    };

    useEffect(() => {
        loadItems();
    }, [user]);

    const handleAddItems = async (newItem) => {
        try {
            const itemId = await addItem(user.uid, newItem);
            setItems(prevItems => [...prevItems, { id: itemId, ...newItem }]);
        } catch (error) {
            console.error("Error adding item: ", error);
        }
    };

    function handleSignOut() {
        firebaseSignOut();
    }
    
    function handleSignIn() {
        gitHubSignIn();
    }

    const changeItem = (newItem) => {
        loadMeal(newItem, setMeals, setMealIdeas);
    }

    useEffect(() => {
        loadMeal(null, setMeals, setMealIdeas);
    })

    const handleItemSelect = (itemName) => {
        if (itemName.includes(',')) {
            return setSelectedItem(itemName.split(',')[0].trim());
        } else {
            return setSelectedItem(itemName.replace(/[\p{Emoji}]/gu, '').trim());
        }
    };

    return (
        <main className="bg-stone-950 text-stone-100 p-4 flex flex-row gap-4">
            {!user && (
                <div className="w-full">
                    <h1>Please sign in.</h1>
                    <button className="bg-yellow-600 text-white font-bold px-4 py-2 m-1" onClick={handleSignIn}>Sign in with GitHub</button>
                </div>
            )}
            {user && (
                <div className="w-full">
                    <div>
                        <h1 className="text-4xl font-bold p-4">Shopping List</h1>
                        <h2 className="text-2xl font-bold px-4">Add New Item</h2>
                        <NewItem onAddItem={handleAddItems} />
                        <ItemList items={items} onItemSelect={handleItemSelect} />
                    </div>
                    <div>
                        <h1>Meals</h1>
                            <MealIdeas ingredient={selectedItem} />
                    </div>
                    <div className="w-full my-4 mr-4">
                        <button className="bg-yellow-600 text-white font-bold px-4 py-2 m-1" onClick={handleSignOut}>Sign out</button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Page;
