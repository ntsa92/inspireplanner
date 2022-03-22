import { LightningElement, api, track, wire  } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import PROJET_OBJECT from '@salesforce/schema/Projet__c';
import ValuesStatus from '@salesforce/schema/Projet__c.Statut_du_projet__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Projet__c.Name';

export default class GetProject extends LightningElement {

    @api recordId;
    @api objectApiName;
    @track picklistStatusValues;
    @track value;
    @wire(getObjectInfo, {objectApiName: PROJET_OBJECT })
    projetinfo;
    @wire(getPicklistValues, { 
        recordTypeId: '$projetInfo.data.defaultRecordTypeId', 
        fieldApiName: ValuesStatus
    })
        controllingValues({data , error}) {
            if (data){
                console.log('picklistValues_Status :',data.values);
                this.picklistStatusValues = data.values;
                this.error = undefined;
            }
            if (error){
                console.log('erreur dans la picklist', error);
                this.error = error;
                this.picklistStatusValues = undefined;
            }
        }
        handleProjetStatus(event){
            this.value = event.target.value;
            console.log('la valeur est :',this.value);
        }
    
        handleNameChange(event) {
            this.name = event.target.value;
        }
        saveRecord() {
            const fields = {};
            fields[NAME_FIELD.fieldApiName] = this.name;
            const recordInput = { apiName: PROJET_OBJECT.objectApiName, fields };
            createRecord(recordInput);
            console.log('enregistrer');
        }

}