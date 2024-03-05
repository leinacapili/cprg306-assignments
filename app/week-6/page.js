"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json"
import React, { useState } from "react";

const Page = () => {
    const [items, setItems] = useState(itemsData);

    const handleAddItem = newItem => {
        setItems(prevItems => [...prevItems, newItem]);
    };

    return (
        <main className="bg-slate-950">
            <div class="m-4">
                <h2 className="text-3xl font-bold m-2">Shopping List</h2>
                <NewItem onAddItem={handleAddItem} />
                <ItemList items={items} />
            </div>
        </main>
    );
};

export default Page;