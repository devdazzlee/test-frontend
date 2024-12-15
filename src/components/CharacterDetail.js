import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacterById } from "../api/rickAndMortyApi";
import { CharacterContext } from "../context/CharacterContext";

const CharacterDetail = () => {
  const { id } = useParams();
  const { currentCharacter, setCurrentCharacter } = useContext(CharacterContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCharacterById(id).then((res) => setCurrentCharacter(res.data));
  }, [id]);

  if (!currentCharacter) return <div>Loading...</div>;

  const { name, status, species, gender, origin, location, image } = currentCharacter;

  return (
    <div className="p-4">
      <img src={image} alt={name} className="rounded w-64 mx-auto" />
      <h1 className="text-3xl font-bold mt-4">{name}</h1>
      <p>Status: {status}</p>
      <p>Species: {species}</p>
      <p>Gender: {gender}</p>
      <p>Origin: {origin.name}</p>
      <p>Location: {location.name}</p>
    </div>
  );
};

export default CharacterDetail;
