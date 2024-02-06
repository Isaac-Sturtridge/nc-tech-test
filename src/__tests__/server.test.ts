import * as request from "supertest";
import { app } from "../server";

describe("starting test", () => {
  test("returns matching card title", async () => {
    const response = await request(app).get("/cards/card001");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        title: "card 1 title",
      })
    );
  });
});

describe.only("GET: /cards", () => {
  test("200: should return a successful response from the server", async () => {
    return request(app).get("/cards").expect(200);
  });

  test('200: should return a response with at least one correct card that matches the object in the json file', async () => {
    return request(app)
    .get("/cards")
    .expect(200)
    .then((response) => {
      const cards = response.body.cards
      cards.forEach((card) => {
        expect(card).toMatchObject({
          title: expect.any(String)
        })
      })
    })
  });

  test('200: should return cards that have the imageUrl and cardId, changed properties from the data in cards.json', () => {
    return request(app)
    .get("/cards")
    .expect(200)
    .then((response) => {
      const cards = response.body.cards
      cards.forEach((card) => {
        expect(card).toMatchObject({
          card_id: expect.any(String),
          imageUrl: expect.any(String)
        })
      })
    })
  });
  test('200: specifically matches the expected json response', () => {
    return request(app)
    .get('/cards')
    .expect(200)
    .then((response) => {
      const cards = response.body.cards
      expect(cards).toEqual([
        {
          "title": "card 1 title",
          "imageUrl": "/front-cover-portrait-1.jpg",
          "card_id": "card001"
        },
        {
          "title": "card 2 title",
          "imageUrl": "/front-cover-portrait-2.jpg",
          "card_id": "card002"
        },
        {
          "title": "card 3 title",
          "imageUrl": "/front-cover-landscape.jpg",
          "card_id": "card003"
        }
      ])
    })
  });
});
