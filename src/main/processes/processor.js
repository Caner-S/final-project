export let processChangesForSnapshot = (doc, snapshot) => {
    let updatedDocs = doc;
    snapshot.docChanges().forEach(change =>{
        let newDocs = processChange(updatedDocs, change);
        if(newDocs !== undefined){
            updatedDocs = newDocs
        }
    });
    return updatedDocs;
};

export const processChange = (docs, change) => {
    switch (change.type) {
        case 'added':
            return addDocToExistingDocs(docs, change.doc);
        case 'modified':
            return modifyExistingDoc(docs, change.doc);
        case 'removed':
            return removeDocFromExistingDocs(docs, change.doc);
        default:
            return undefined;
    }
};

const addDocToExistingDocs = (docs, change) => docs.concat(change);
const modifyExistingDoc = (docs, change) => docs.filter(item => item.id !== change.id).concat(change);
const removeDocFromExistingDocs = (docs, change) => docs.filter(item => item.id !== change.id);
