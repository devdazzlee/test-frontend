import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CharacterContext } from "../context/CharacterContext";

const AddEditCharacter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { characters, setCharacters } = useContext(CharacterContext);

  const isEdit = Boolean(id);
  const existingCharacter = isEdit
    ? characters.find((character) => character.id === Number(id))
    : null;

  const [form, setForm] = useState({
    name: existingCharacter?.name || "",
    status: existingCharacter?.status || "Alive",
    species: existingCharacter?.species || "",
    gender: existingCharacter?.gender || "Male",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      // Update character in local state
      setCharacters(
        characters.map((character) =>
          character.id === Number(id) ? { ...character, ...form } : character
        )
      );
    } else {
      // Add a new character to local state
      const newCharacter = {
        id: characters.length + 1, // Temporary ID
        ...form,
        image: "https://via.placeholder.com/150", // Placeholder image
      };
      setCharacters([...characters, newCharacter]);
    }
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Character</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Status</label>
          <select
            className="border p-2 w-full"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Species</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={form.species}
            onChange={(e) => setForm({ ...form, species: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Gender</label>
          <select
            className="border p-2 w-full"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unknown">Unknown</option>
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {isEdit ? "Update" : "Add"} Character
        </button>
      </form>
    </div>
  );
};

export default AddEditCharacter;
