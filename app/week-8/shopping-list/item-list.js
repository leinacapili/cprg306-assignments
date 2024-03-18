"use client";

import Item from "./item";
import React, { useState } from "react";

const ItemList = ({ items, onItemSelect }) => {

    const [sortBy, setSortBy] = useState('name');
    const [groupBy, setGroupBy] = useState(false);

    const sortedList = [...items].sort((a, b) => {
        if (sortBy === 'name') {
            if (a.name < b.name) return -1;
            else if (a.name > b.name) return 1;
            else return 0;
        } else if (sortBy === 'category') {
            if (a.category < b.category) return -1;
            else if (a.category > b.category) return 1;
            else return 0;
        }
    })

    const groupedItems = sortedList.reduce((acc, currentItem) => {
        const {category} = currentItem;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(currentItem);
        return acc;
    }, {});

    return (
        <div>
            <div className="flex flex-row items-center mx-4 py-1">
                <div className="p-4 font-bold">
                    Sort by:
                </div>
                {groupBy === "name" ? (
                    <button className="bg-yellow-600 text-white font-bold px-4 py-2 m-1" value="name">
                        Name
                    </button>) : (
                    <button className="bg-yellow-600 text-white font-bold px-4 py-2 m-1 border-yellow-600 rounded-lg hover:bg-yellow-500" onClick={(e) => {setSortBy(e.target.value); setGroupBy(false)}} value="name">
                        Name
                    </button>
                )}
                {groupBy === "groupBy" ? (
                    <button className="bg-yellow-600 text-white font-bold px-4 py-2 m-1" value="groupBy">
                        Category
                    </button>) : (
                    <button className="bg-yellow-600 text-white font-bold px-4 py-2 m-1 border-yellow-600 rounded-lg hover:bg-yellow-500" onClick={(e) => {setSortBy(e.target.value); setGroupBy(false)}} value="groupBy">
                        Category
                    </button>
                )}
                {groupBy === "groupBy" ? (
                    <button className="bg-yellow-600 text-white font-bold px-4 py-2 m-1" value="groupBy">
                        Group by Category
                    </button>) : (
                    <button className="bg-yellow-600 text-white font-bold px-4 py-2 m-1 border-yellow-600 rounded-lg hover:bg-yellow-500" onClick={(e) => {setSortBy(e.target.value); setGroupBy(true)}} value="groupBy">
                        Group by Category
                    </button>
                )}
            </div>
            <div>
                <ul>
                    {!groupBy ? (sortedList.map((item) => {
                        return <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} onSelect={onItemSelect} />
                    })) : (Object.entries(groupedItems).map((groupedItem) => {
                        return (<li className="p-2 m-4 bg-stone-900 text-gray-50 max-w-sm rounded-lg" key={groupedItem[1][0].id}>
                                    <h1 className="text-xl font-bold p-2 mx-2 rounded-xl">{groupedItem[0]}</h1>
                                    {groupedItem[1].map((item) => {
                                        return (
                                            <div key={item.id} className="px-4 my-4">
                                                <div className="p-2 m-4 border rounded-lg">
                                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                                    <p className="mt-[0.5rem]">{`Buy ${item.quantity} in ${item.category}`}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </li>);
                        }
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ItemList;
