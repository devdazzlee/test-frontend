import { createContext, useState, useEffect } from "react";
import { getCharacters } from "../api/rickAndMortyApi";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [page, setPage] = useState(1);

  // Fetch characters on initial load
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await getCharacters(page);
        setCharacters(response.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, [page]);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setCharacters,
        currentCharacter,
        setCurrentCharacter,
        page,
        setPage,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
