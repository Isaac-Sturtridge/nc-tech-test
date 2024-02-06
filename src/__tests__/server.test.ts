import * as request from "supertest";
import { app } from "../server";
import { readFile, writeFile } from "fs/promises";

// this is to clear tests after posting to them so that initial data is retained
let initialData: string

beforeAll(async () => {
  initialData = await readFile(`${__dirname}/../data/cards.json`, 'utf-8')
})

afterAll(async () => {
  return writeFile(`${__dirname}/../data/cards.json`, initialData, 'utf-8')
})

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

describe("General error handling", () => {
  test('404: A non-existent route will return not found"', async () => {
    return request(app)
      .get("/not-a-route")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("Not Found");
      });
  });
});

describe("GET: /cards", () => {
  test("200: should return a successful response from the server", async () => {
    return request(app).get("/cards").expect(200);
  });

  test("200: should return a response with at least one correct card that matches the object in the json file", async () => {
    return request(app)
      .get("/cards")
      .expect(200)
      .then((response) => {
        const cards = response.body.cards;
        cards.forEach((card) => {
          expect(card).toMatchObject({
            title: expect.any(String),
          });
        });
      });
  });

  test("200: should return cards that have the imageUrl and cardId, changed properties from the data in cards.json", async () => {
    return request(app)
      .get("/cards")
      .expect(200)
      .then((response) => {
        const cards = response.body.cards;
        cards.forEach((card) => {
          expect(card).toMatchObject({
            card_id: expect.any(String),
            imageUrl: expect.any(String),
          });
        });
      });
  });
  test("200: specifically matches the expected json response", async () => {
    return request(app)
      .get("/cards")
      .expect(200)
      .then((response) => {
        const cards = response.body.cards;
        expect(cards).toEqual([
          {
            title: "card 1 title",
            imageUrl: "/front-cover-portrait-1.jpg",
            card_id: "card001",
          },
          {
            title: "card 2 title",
            imageUrl: "/front-cover-portrait-2.jpg",
            card_id: "card002",
          },
          {
            title: "card 3 title",
            imageUrl: "/front-cover-landscape.jpg",
            card_id: "card003",
          },
        ]);
      });
  });
});


describe('GET: /cards/:cardId', () => {
  test('200: should return the card asked for in its full format, title, sizes, pages and basePrice', async () => {
    return request(app)
    .get("/cards/card002")
    .expect(200)
    .then((response) => {
      const card = response.body
      expect(card).toEqual({
        "id": "card002",
        "title": "card 2 title",
        "sizes": [
          "md"
        ],
        "basePrice": 200,
        "pages": [
          {
            "title": "Front Cover",
            "templateId": "template005"
          },
          {
            "title": "Inside Left",
            "templateId": "template002"
          },
          {
            "title": "Inside Right",
            "templateId": "template003"
          },
          {
            "title": "Back Cover",
            "templateId": "template004"
          }
        ]
      },)
    })
  });

  test('400: returns "Bad Request" when given a card id that is not in the database', async () => {
    return request(app)
    .get("/cards/the-joker")
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe('Bad Request')
    })
  });
});

describe('POST: /cards', () => {
  test('201: should post a new card', async () => {
    const input = {
        "title": "example title",
        "sizes": [
          "sm",
          "md",
          "gt"
        ],
        "basePrice": 200,
        "pages": [
          {
            "title": "Front Cover",
            "templateId": "template001"
          },
          {
            "title": "Inside Left",
            "templateId": "template002"
          },
          {
            "title": "Inside Right",
            "templateId": "template003"
          },
          {
            "title": "Back Cover",
            "templateId": "template004"
          }
        ]
    }
    return request(app)
    .post('/cards')
    .send(input)
    .expect(201)
    .then((response) => {
      const card = response.body
      expect(card).toEqual({
        id: "card004",
        "title": "example title",
        "sizes": [
          "sm",
          "md",
          "gt"
        ],
        "basePrice": 200,
        "pages": [
          {
            "title": "Front Cover",
            "templateId": "template001"
          },
          {
            "title": "Inside Left",
            "templateId": "template002"
          },
          {
            "title": "Inside Right",
            "templateId": "template003"
          },
          {
            "title": "Back Cover",
            "templateId": "template004"
          }
        ]
      })
    })
  });
});