import axios from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

export const getCharacters = (page = 1) => axios.get(`${BASE_URL}/character?page=${page}`);

export const getCharacterById = (id) => axios.get(`${BASE_URL}/character/${id}`);
