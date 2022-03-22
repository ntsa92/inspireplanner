import { LightningElement, track } from 'lwc';

export default class exportSettngs extends LightningElement {
   
    value = 'inProgress';
    get options() {
        return [
            { label: '9:00 AM', value: '9:00 AM' },
            { label: '10:00 AM', value: '10:00 AM' },
            { label: '11:00 AM', value: '11:00 AM' },
        ];
    }

    closeExportSettingHandler(event){
        event.preventDefault();  
        this.dispatchEvent(new CustomEvent('killexportsettings'));
    }       
}