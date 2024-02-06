import * as express from "express";
import { getCards } from "./controllers/cards.controllers";
import { handleNotFoundError, handleServerErrors } from "./controllers/errors.controllers";

export const app = express();

app.set("json spaces", 2);

app.get("/cards", getCards);

app.get("/cards/:cardId/:sizeId?", () => {
  // respond with card by id
});

app.get("*", handleNotFoundError);

// a final error in case anything goes wrong with the app
app.use(handleServerErrors)