import { LightningElement } from 'lwc';

export default class OrdreExecutionTache extends LightningElement {
    value = 'inProgress';

    get options() {
        return [
            { label: '9:00 AM', value: '9:00 AM' },
            { label: '10:00 AM', value: '10:00 AM' },
            { label: '11:00 AM', value: '11:00 AM' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }     
}