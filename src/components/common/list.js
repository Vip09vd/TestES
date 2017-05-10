export const UPDATE_LIST_EVENT_TYPE = 'update_list';

export default class List {
    constructor(items, subscribe){
        this.items = items;
        this.list = document.createElement('ul');
        if (subscribe) {
            subscribe(UPDATE_LIST_EVENT_TYPE, this.update);
        }
    }

    render() {
        this.items.forEach((item) => {
            const listItem = new ListItem(item);
            this.list.appendChild(listItem.render());
        });
        return this.list;
    }

    update = (items) => {
        if (this.items !== items) {
            this.items = items;
            this.list.innerHTML = '';
            this.render();
        }
    }
}

export class ListItem {
    constructor (item) {
        this.item = item;
        this.listItem = document.createElement('li');
    }

    render() {
        this.listItem.appendChild(this.item.render && this.item.render() || this.item);
        return this.listItem;
    }
}