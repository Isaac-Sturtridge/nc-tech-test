import * as express from "express";
import { getCards, getCardsById, postCards } from "./controllers/cards.controllers";
import { handleNotFoundError, handleCustomErrors, handleServerErrors } from "./controllers/errors.controllers";

export const app = express();

app.use(express.json())

app.set("json spaces", 2);

app.get("/cards", getCards);

app.get("/cards/:cardId/:sizeId?", getCardsById);

app.post("/cards", postCards);

app.get("*", handleNotFoundError);


app.use(handleCustomErrors)
// a final error in case anything goes wrong with the app
app.use(handleServerErrors)