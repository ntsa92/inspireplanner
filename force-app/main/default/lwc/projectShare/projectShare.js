import { LightningElement } from 'lwc';

export default class LightningExampleInputSearch extends LightningElement {
    queryTerm;

    value = '';

    get opt() {
        return [
            { label: 'Viewer', value: 'option1' },
            { label: 'Editor', value: 'option2' },
        ];
    }

    value = '';

    get Options() {
        return [
            { label: 'Assigned tasks only', value: 'option1' },
            { label: 'Full project', value: 'option2' },
        ];
    }

    value = ['option1'];

    get option() {
        return [
            {  value: 'option1' }
           
        ];
    }

    get selectedValues() {
        return this.value.join(',');
    }

    handleChange(e) {
        this.value = e.detail.value;
    }



    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.queryTerm = evt.target.value;
        }
        
    }
}