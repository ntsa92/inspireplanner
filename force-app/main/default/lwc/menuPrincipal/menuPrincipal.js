import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MenuPrincipal extends LightningElement {
    chatIsVisible = false;
    revealSaveAs = false;
    revealExportSettings = false;

    revealSaveAsHandler(event){
        event.preventDefault();  
        this.revealSaveAs = true;
    }
    killSaveAsHandler(event){
        this.revealSaveAs = false; 
    }
    listAllSalesforceTaskHandler(event){
        event.preventDefault();  
        this.chatIsVisible = true;
    }     
    
    revealExportSettingsHandler(event){
        event.preventDefault();
        this.revealExportSettings=true;
    }

    tableToExcel(){

    }

    

    killExportSettingsHandler(event){
        this.revealExportSettings = false;
    }

}