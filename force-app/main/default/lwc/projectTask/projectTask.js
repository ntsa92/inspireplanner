import { api, LightningElement, wire } from 'lwc';
import {loadStyle} from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/colors';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import { createRecord } from 'lightning/uiRecordApi';

const columns = [
    { label: 'Upload File', fieldName: 'attachment', type: 'button-icon', fixedWidth: 40, iconName: 'utility:attach', hideDefaultActions: true, hideLabel: true, typeAttributes: {
        iconName: { fieldName: 'attachIcon' },
        title: 'File attachment indicator',
        variant: 'container',
        class: 'attachment-icon'
    },},
    { label: 'Chatter', fieldName: 'comments', type: 'button-icon', fixedWidth: 40, iconName: 'utility:comments', hideDefaultActions: true, hideLabel: true, typeAttributes: {
        iconName: { fieldName: 'commentIcon' },
        title: 'Chatter message indicator',
        variant: 'container',
        class: 'comment-icon'
    }, },
    { label: 'Checklist item', fieldName: 'clipboard', type: 'button-icon', fixedWidth: 40, iconName: 'utility:copy_to_clipboard', hideDefaultActions: true, hideLabel: true, typeAttributes: {
        iconName: { fieldName: 'clipboardIcon' },
        title: 'Checklist item indicator',
        variant: 'container',
        class: 'clipboard-icon'
    }, },
    /************************************/
    { label: 'Task Subject', fieldName: 'subject', type: 'text', editable: true, initialWidth: 320 },
    { label: 'Status', fieldName: 'status', type: 'picklist', editable: true, initialWidth: 130, typeAttributes: {
        placeholder: 'Choose rating',
        options: [
            { label: 'Hot', value: 'Hot' },
            { label: 'Warm', value: 'Warm' },
            { label: 'Cold', value: 'Cold' },
        ] // list of all picklist options
        , value: { fieldName: 'status' } // default value for picklist
        , context: { fieldName: 'row_id' } // binding account Id with context variable to be returned back
    } },
    { label: '% Complete', fieldName: 'complete', type: 'percent', editable: true, initialWidth: 130 },
    { label: 'Duration', fieldName: 'duration', type: 'number', editable: true, initialWidth: 130 },
    {
        label: 'Start Date',
        fieldName: 'start',
        type: 'date',
        typeAttributes: {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }, editable: true,
        initialWidth: 130
    },
    {
        label: 'Finish Date',
        fieldName: 'finish',
        type: 'date',
        editable: true,
        typeAttributes: {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }, editable: true,
        initialWidth: 130
    },
    { label: 'Assigned To', fieldName: 'assignedTo', type: 'Lookup Relationship', editable: true, initialWidth: 200},
    { label: 'Predecessors', fieldName: 'predecessor', type: 'Lookup Relationship', editable: true, initialWidth: 130 },
    { label: 'Priority', fieldName: 'priority', type: 'picklist', editable: true, initialWidth: 130 },
    { label: 'Note', fieldName: 'note', type: 'text', editable: true, initialWidth: 230 },
];

export default class ProjectTask extends LightningElement {
    data = [
        {
            row_id: 0,
            subject: 'Writing the backlog',
            status: 'In Progress',
            complete: 0.25,
            duration: 31,
            start: '04/03/2022',
            finish: '04/04/2022',
            assignedTo: 'DONGMO DONALD',
            predecessor: '',
            priority: 'High',
            note: '',
        },
        {
            row_id: 20,
            subject: 'testing deliverables',
            status: 'Not Started',
            complete: 0,
            duration: 4,
            start: '03/20/2022',
            finish: '03/24/2022',
            priority: 'Normal',
        },
        {}, {}, {}, {}, {}
    ];
    columns = columns;
    rowOffset = 0;
    isCssLoaded = false;

    @api recordId;
    accountName;
    error;

    saveDraftValues;
    prev_ID = 0;
    datas = [];

    // Récupérer les données depuis la base de données
    @wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD] })
    wiredAccount({data, error}) {
        console.log('recordId: ', this.recordId);
        if (data) {
            this.accountName = data.fields.Name.value;
        } else if(error) {
            this.error =error;
            console.error('Something Went Wrong');
        }
    }

    // Lancer le mode éditiion sur une ligne
    startEditMode() {
        const dt = this.template.querySelector('lightning-datatable');
        dt.openInlineEdit();
    }

    // Charger les ressources statiques
    renderedCallback() {
        if(this.isCssLoaded) return;
        this.isCssLoaded = true;
        loadStyle(this, COLORS).then(()=>{
            console.log('Loaded Successfully');
        }).catch(error => {
            console.error('Error when loading colors');
        })

        // Format data for been displayed
        this.formatData(this.data);
    }

    // Sauvegarder les changements
    handleSave(e) {
        this.saveDraftValues = e.detail.draftValues;
        console.log('Données: ', this.saveDraftValues);
        // this.saveDraftValues.map((draftValue)  => {
        //     const recordInput = {
        //         apiName: ACCOUNT_OBJECT.objectApiName,
        //         fields: {
        //             [ACCOUNT_NAME_FIELD.fieldApiName] : draftValue.subject
        //         }
        //     };
        //     createRecord(recordInput)
        //     .then(acc => {
        //         console.log('Saved');
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     })
        // })
    }

    // Afficher les valeurs par défauts lors de la création d'une nouvelle tâche
    handleChange(e) {
        const today = new Date();
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1);
        const draft = e.detail.draftValues.map(value => {
            return value;
        });

        const newTask = {
            row_id: parseInt(draft[0].id.slice(4)),
            subject: draft[0].subject,
            status: 'Not Started',
            complete: 0,
            duration: 1,
            start: today,
            finish: tomorrow,
            priority: 'Normal',
        }

        this.datas = this.datas.map(data => {
            if (data.row_id == newTask.row_id) {
                data = newTask;
                data.attachIcon = 'utility:attach',
                data.commentIcon = 'utility:comments',
                data.clipboardIcon = 'utility:copy_to_clipboard'
            }
            return data;
        })
    }

    picklistChanged(event) {
        event.stopPropagation();
        let dataRecieved = event.detail.data;
        let updatedItem = { Id: dataRecieved.context, Rating: dataRecieved.value };
        this.updateDraftValues(updatedItem);
        this.updateDataValues(updatedItem);
    }

    // Ajouter une nouvelle tâche
    addNewTask() {
        this.prev_ID++;
        this.datas = [...this.datas, {row_id: this.prev_ID}];
    }

    // Retirer une tâche
    // removeSelectedTask() {}

    formatData(d) {
        d.map(data => {
            data.subject == undefined 
            ? (
                this.prev_ID++,
                data.row_id = this.prev_ID
            ) 
            : (
                data.attachIcon = 'utility:attach',
                data.commentIcon = 'utility:comments',
                data.clipboardIcon = 'utility:copy_to_clipboard'
            );
            const number_of_row = data.row_id - this.prev_ID;
            if (number_of_row <= 1) {
                this.datas = [...this.datas, data];
                this.prev_ID = data.row_id;
            } else if(number_of_row > 1) {
                for (let i = 1; i < number_of_row; i++) {
                    this.prev_ID = this.prev_ID + 1;
                    this.datas = [...this.datas, {row_id: this.prev_ID}];
                }
                this.datas = [...this.datas, data];
                this.prev_ID = data.row_id;
            }
            console.log("id: ", this.prev_ID);
        })
        // console.log('Modified table: ', this.datas);
    }
}