import {writeFile, readFile} from 'fs/promises'

interface card {
    id: string,
    title: string,
    sizes: Array<string>,
    basePrice: number,
    pages: Array<any>
}

export async function selectCards(): Promise<any> {
    try {
        const data = await readFile(`${__dirname}/../data/cards.json`, 'utf-8')
        const parsedData = JSON.parse(data)
        const templates = await readFile(`${__dirname}/../data/templates.json`, 'utf-8')
        const parsedTemplates = JSON.parse(templates)
        const cards = []
        interface formattedCard {
            title: string,
            imageUrl: string,
            card_id: string
        }
        parsedData.forEach((card) => {
            const templateId = card.pages[0].templateId
            const templateImage = parsedTemplates.find((template) => templateId === template.id).imageUrl
            const newCard: formattedCard = {title: card.title, imageUrl: templateImage, card_id: card.id}
            cards.push(newCard)
        })

        return cards
    } catch (error) {
        console.error('Error reading json files')
    }       
}

export async function selectCardById(id: string): Promise<any> {
    try {
        const data = await readFile(`${__dirname}/../data/cards.json`, 'utf-8')
        const parsedData = JSON.parse(data)
        const filtered = parsedData.filter((card) => card.id === id)
        if(filtered.length === 0) {
            return Promise.reject({status: 400, msg: 'Bad Request'})
        }
        const newCard = filtered[0]
        return newCard

    } catch (error) {
        console.error('Error reading json files')
    } 

}

export async function insertCard(card: card): Promise<any> {
    try {
        // add the id to the card
        const currentCards = await readFile(`${__dirname}/../data/cards.json`, 'utf-8')
        const parsingCurrentCards = JSON.parse(currentCards)
        // a system to ensure validity on all card ids in this format
        if(parsingCurrentCards.length < 9) {
            card.id = `card00${parsingCurrentCards.length + 1}`
        } else if(parsingCurrentCards.length < 99) {
            card.id = `card0${parsingCurrentCards.length + 1}`
        } else {
            card.id = `card${parsingCurrentCards.length + 1}`
        }
        parsingCurrentCards.push(card)
        // put it in the file by rewriting everything
        const newStringedCards = JSON.stringify(parsingCurrentCards)
        await writeFile(`${__dirname}/../data/cards.json`, newStringedCards)

        // now to read this card
        const data = await readFile(`${__dirname}/../data/cards.json`, 'utf-8')
        const parsedData = JSON.parse(data)
        const filtered = parsedData.filter((checkedCard) => card.id === checkedCard.id)
        const checkedCard = filtered[0]
        return checkedCard
    } catch (error) {
        console.error('Error inserting the card')
    }
}
