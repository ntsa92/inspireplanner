import { LightningElement } from 'lwc';
import fetchDataHelper from './fetchDataHelper';
const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Compagny', fieldName: 'compagny', type: 'text' },
    { label: 'Email', fieldName: 'email', type:'email' },
    { label: 'City', fieldName: 'city', type: 'text' },
    { label: 'Type', fieldName: 'type', type: 'text' },
];
export default class BasicDatatable extends LightningElement {
    data = [];
    columns = columns;

    // eslint-disable-next-line @lwc/lwc/no-async-await
    async connectedCallback() {
        const data = await fetchDataHelper({ amountOfRecords: 100 });
        this.data = data;
    }
}