import { selectCards, selectCardById, insertCard} from "../models/cards.models"

export async function getCards (req, res, next): Promise<any> {
    try {
        const cards = await selectCards()

        return res.status(200).send({cards})
    } catch (error) {
        return next(error)
    }
}

export async function getCardsById (req, res, next): Promise<any> {
    const id = req.params.cardId

    try {
        const card = await selectCardById(id)

        // only sending one thing this time
        return res.status(200).send(card)
    } catch (error) {
        return next(error)
    }
}

export async function postCards (req, res, next): Promise<any> {
    const newCard = req.body
    try {
        const completedCard = await insertCard(newCard)

        return res.status(201).send(completedCard)
    } catch (error) {
        return next(error)
    }
}