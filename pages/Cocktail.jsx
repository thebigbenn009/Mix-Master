import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/CocktailPage";
import axios from "axios";
import { Link, Navigate, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const singleCocktailUrl =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
const singleCocktailQuery = (id) => {
  return {
    queryKey: ["cocktail", id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`);
      return data;
    },
  };
};
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(singleCocktailQuery(id));
    return { id };
  };

const Cocktail = () => {
  const { id } = useLoaderData();
  const { data } = useQuery(singleCocktailQuery(id));
  if (!data) return <Navigate to="/" />;
  const singleDrink = data.drinks[0];
  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;
  // console.log(singleDrink);
  const keys = Object.keys(singleDrink).filter((item) =>
    item.startsWith("strIngredient")
  );
  const ingredients = keys
    .filter((ingredients) => singleDrink[ingredients] !== null)
    .map((ingredient) => singleDrink[ingredient]);
  // console.log(ingredients);
  const displayIngredients = (ing) => {
    if (ing.length >= 2) {
      const joinedIngredients = ing.slice(0, -1).join(", ");

      const result = `${joinedIngredients}, ${ing[ing.length - 1]}`;
      return result;
    } else if (ing.length === 1) {
      return ing[0];
    }
  };

  return (
    <Wrapper>
      <header>
        <Link to="/" className="btn">
          back home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className="img" />
        <div className="drink-info">
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {displayIngredients(ingredients)}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cocktail;
//
