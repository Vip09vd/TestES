export const UPDATE_CARDS_EVENT_TYPE = 'update_cards';

export default class Cards {
    constructor(persons, subscribe) {
        this.persons = persons;
        this.cardsContainer = document.createElement('div');
        if (subscribe) {
            subscribe(UPDATE_CARDS_EVENT_TYPE, this.update);
        }
    }

    render() {
        this.persons.forEach((person) => {
            const card = new Card(person);
            this.cardsContainer.appendChild(card.render());
        });
        return this.cardsContainer;
    }

    update = (persons) => {
        if (this.persons !== persons) {
            this.persons = persons;
            this.cardsContainer.innerHTML = '';
            this.render();
        }
    }
}

export class Card {
    constructor (person) {
        this.person = person;
        this.card = document.createElement('div');
    }

    render() {
        this.card.appendChild(this.person.render && this.person.render() || this.person);
        return this.card;
    }
}