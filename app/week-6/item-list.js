"use client";

import Item from "./item";
import React, { useState } from "react";
// import items from "./items.json";

const ItemList = ({ items }) => {
    const [sortBy, setSortBy] = useState('name');

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'category') {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    return (
        <div>
            <div>
                <label for="sort">Sort by: </label>
                <button class="bg-orange-700 p-1 m-2 w-28" onClick={() => setSortBy('name')}>Name</button>
                <button class="bg-orange-700 p-1 m-2 w-28" onClick={() => setSortBy('category')}>Category</button>
            </div>
            <ul>
                {sortedItems.map(item => (
                    <Item
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
