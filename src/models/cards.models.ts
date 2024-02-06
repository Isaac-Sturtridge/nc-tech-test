import {readFile} from 'fs/promises'

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
        console.error('Error reading cards.json')
    }       
}