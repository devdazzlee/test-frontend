import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CharacterContext } from "../context/CharacterContext";
import { useNavigate } from "react-router-dom";


const CharacterList = () => {
  const { characters, setCharacters, page, setPage } = useContext(CharacterContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Filter characters based on search input
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setCharacters(characters.filter((character) => character.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Rick and Morty Characters</h1>
      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Search characters by name..."
          className="border p-2 rounded w-10/12	 mr-4 "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          to="/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Character
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {filteredCharacters.map((character) => (
          <div key={character.id} onClick={() => navigate(`/character/${character.id}`)} // Navigate on click
            className="border p-4 rounded shadow ">
            <img src={character.image} alt={character.name} className="rounded mb-2" />
            <h3 className="text-lg font-semibold">{character.name}</h3>
            <p>{character.species}</p>
            <p>{character.status}</p>
            <div className="flex justify-start">
              <Link
                to={`/edit/${character.id}`}
                className="bg-green-500 text-white px-2 py-1 rounded mr-4"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(character.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}


      </div>
      <div className="mt-4">
        <button
          className="bg-gray-200 p-2 rounded"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className="bg-gray-200 p-2 rounded ml-2"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
