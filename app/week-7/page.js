"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json"
import React, { useState } from "react";
import MealIdeas from "./meal-ideas";

const Page = () => {
    const [items, setItems] = useState(itemsData);
    const [selectedItem, setSelectedItem] = useState('');

    const handleAddItems = (newItem) => {
        setItems([...items, newItem]);
    }

    const handleItemSelect = (itemName) => {
        if (itemName.includes(',')) {
            return setSelectedItem(itemName.split(',')[0].trim());
        } else {
            return setSelectedItem(itemName.replace(/[\p{Emoji}]/gu, '').trim());
        }
    }

    return (
        <main className="bg-stone-950 text-stone-100 p-4 flex flex-row gap-4">
            <div className="w-full">
                <h1 className="text-4xl font-bold p-4">Shopping List</h1>
                <h2 className="text-2xl font-bold px-4">Add New Item</h2>
                <NewItem onAddItem={handleAddItems} />
                <ItemList items={items} onItemSelect={handleItemSelect} />
            </div>
            <div className="w-full my-4 mr-4">
                <MealIdeas ingredient={selectedItem} />
            </div>
        </main>
    );
};

export default Page;
