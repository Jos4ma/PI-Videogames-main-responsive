// import { render, screen } from '@testing-library/react';
// import App from './App';
import { render, screen } from "@testing-library/react";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Create from "./components/CreateVideogame";


import {
  filteredByGender,
  filterPokemonCreated,
  sortPokemonsAlphabetically,
  sortPokemonsByStrength,
} from "../src/actions/index";


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


describe("Reducer-Actions Tests:", () => {
  it("It should return an action with props type FILTERED_BY_GENDER & payload, the value is send as an argument:", () => {
    expect(filteredByGender("Adventure")).toEqual({
      type: "FILTERED_BY_GENDER",
      payload: "Adventure",
    });
  })
})


describe("Form test", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Create />
        </BrowserRouter>
      </Provider>
    );
  });
  it("The form should have an input for the videogame's name", () => {
    const element = screen.getByLabelText("Name:");
    expect(element.type).toBe("text");
  });
  it("The form must have an input for the videogame's released", () => {
    const element = screen.getByLabelText("Released:");
    expect(element.type).toBe("text");
  });
  it("The form must have an input for the videogame's rating", () => {
    const element = screen.getByLabelText("Rating:");
    expect(element.type).toBe("number");
  });
  it("The form should have two input for the videogame's description", () => {
    const element = screen.getByLabelText("Description:");
    expect(element.type).toBe("textarea");
  });
  it("The form should have an input for the videogame's image", () => {
    const element = screen.getByLabelText("Image:");
    expect(element.type).toBe("url");
  });
  it("The form should have an input for the videogame's genres", () => {
    const element = screen.getByLabelText("Genres:");
    expect(element.type).toBe("select-one");
  });
  it("The form should have an input for the videogame's platforms", () => {
    const element = screen.getByLabelText("Platforms:");
    expect(element.type).toBe("select-one");
  });
});