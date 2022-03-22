import { LightningElement, api, wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import PROJECT_NAME from '@salesforce/schema/Project__c.Name';

export default class MenuSecondaireV2 extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: [PROJECT_NAME] })
    wiredProject({data, error}) {
        console.log(this.recordId);
        if (data) {
            console.log("data");
        } else {
            console.log("error");
        }
    }
}