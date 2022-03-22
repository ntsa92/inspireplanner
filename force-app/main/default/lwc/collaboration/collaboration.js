import { LightningElement } from 'lwc';
const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Permissions', fieldName: 'website', type: 'url' },
    { label: 'Type', fieldName: 'phone', type: 'phone' },
    { label: 'Task visibility', fieldName: 'amount', type: 'currency' },
    { label: 'Remote', fieldName: 'closeAt', type: 'date' },
];

export default class CollaborateurAjout extends LightningElement {


    columns = columns;


}