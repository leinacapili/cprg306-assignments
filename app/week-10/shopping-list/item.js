const Item = ({ name, quantity, category, onSelect }) => {
    return (
        <li className="p-2 m-4 bg-stone-900 text-gray-50 max-w-sm hover:bg-gray-400 border-lime-700 rounded-lg" onClick={() => onSelect(name)}>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-sm">{`Buy ${quantity} in ${category}`}</p>
        </li>
    );
};

export default Item;
