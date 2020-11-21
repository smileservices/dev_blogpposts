//SKELETON FOR CRUD OPERATIONS REACT-DRF


```
* Higher level reusable presentation components *

CreatableModalComponent      when creating a resource from within the display of a parent resource
                        shows "Add New" button which opens up a modal with the resource form
EditableModalComponent       when needing to both display and edit a resource
                        shows edit icon on item list toolbar with opens up a modal with the resource form
FormLayoutComponent     use to composite a form

```

function CreatableModalComponent({endpoint, data, extraData={}, FormComponent, successCallback}) {
    ```
    encapsulates the "add new ..." logic
    shows the "add new" button
    if pressed, it opens up a modal showing the FormComponent
    --------
    endpoint:               url for resource REST endpoint
    data:                   form data
    extraData:              supplimentary data that is passed to the form
                            should have {addButtonText: 'Add New', submitFormButtonText: 'Some text'}
                            default form submit button text is "Submit"
    FormComponent:      form component interface for resource 
                            data->data, extradata->extradata, submitCallback, waiting, alert, errors
    successCallback:        function to be executed when create is successful
    customCreateFunction:   function to override the default create. its payload is validated form data
    ```

    const [showForm, setShowForm] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [alert, setAlert] = useState(false);
    const [errors, setErrors] = useState({});

    function createElement(validatedData) {
        if (customCreateFunction) {
            customCreateFunction(FormData)
        } else {
            //do standard api_create and execute successCallback / handle errors/alerts
        }
    }

    function displayFormModal() {
        return (
            <Modal close={toggleShowForm}>
                <FormComponent
                    data={data}
                    extraData={extraData}
                    submitCallback={createElement}
                    waiting={waiting}
                    alert={alert}
                    errors={errors}
                />
            </Modal>
        )
    }

    //show add button which when pressed opens the modal
    return (
        <Fragment>
            <button type="button" className="btn" onClick={e => toggleShowForm()}>{extraData.addButtonText}</button>
            {showForm ? displayFormModal() : ''}
        </Fragment>
    )
}


export default function EditableModalComponent({
    endpoint, data, extraData, DisplayViewComponent, FormComponent, updateSuccessCallback,
    deleteSuccessCallback
}) {
    ```
    encapsulates the update/delete logic for resource
    shows the resource with a toolbar with "edit" and "delete" actions
    when press edit, show modal with edit form
    ------
    endpoint:               url for resource REST endpoint
    data:                   form data
    extraData:              supplimentary data that is passed to the form
                            default form submit button text is "Submit" but can override
                            if have {submitFormButtonText: 'Some other text'}
    DisplayViewComponent:   display component with "data"
    FormComponent:      form component interface for resource
                            data->data, extradata->extradata, submitCallback, waiting, alert, errors
    updateSuccessCallback:  function to be executed when update is successful
    deleteSuccessCallback:  function to be executed when delete is successful
    customUpdateFunction:   function to override the default update. its payload is validated form data
    ```

    const [showForm, setShowForm] = useState(false);
    const [displayAlert, setDisplayAlert] = useState(false); //alert shown on display component
    
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteWaiting, setDeleteWaiting] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false); //alert shown on display component

    const [updateWaiting, setUpdateWaiting] = useState(false);
    const [updateAlert, setUpdateAlert] = useState(false); //alert shown on form
    const [updateErrors, setUpdateErrors] = useState({});

    function deleteElement() {
        //delete element
    }
    function updateElement(formData) {
        //update element
    }

    function displayFormModal() {
        return (
            <Modal close={toggleShowForm}>
                <FormComponent
                    data={data}
                    extraData={extraData}
                    submitCallback={updateElement}
                    waiting={updateWaiting}
                    alert={updateAlert}
                    errors={updateErrors}
                />
            </Modal>
        )
    }

    return (
        <Fragment>
            <span className="toolbar">
                { waiting ? waiting :
                    confirmDelete
                        ? <div className="confirm">
                            <span className="text">Are you sure?</span>
                            <span className="option delete" onClick={deleteElement}>yes</span>
                            <span className="option" onClick={e => setConfirmDelete(false)}>cancel</span>
                        </div>
                        :
                        <Fragment>
                            <span className="icon-pencil edit" onClick={toggleShowForm}/>
                            <span className="icon-close delete" onClick={e => setConfirmDelete(true)}/>
                        </Fragment>
                }
            </span>
            {deleteAlert}
            {displayAlert}
            <DisplayViewComponent data={data}/>
            {showForm ? displayFormModal() : ''}
        </Fragment>
    )
}

export default function FormLayoutElement({data, children, submitCallback, buttonText, alert, waiting}) {
    ```
    handles displaying form common elements - form submit, showing alert and waiting
    ```
    return (
        <form onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            submitCallback(data);
        }}>
            { children }
            { alert }
            { waiting ? waiting : <button type="submit" className="btn submit">{buttonText}</button> }
        </form>
    )
}


export default function ResourceExampleForm({data, extraData, submitCallback, waiting, alert, errors, setAlert, setErrors}) {
    ```
    example of implementing FormComponent interface for an example resource
    this form should be able to work for both update and create
    should receive setAlert and setErrors for handling the validation
    ```
    const emptyData = {
        //empty data for populating form
        'name': '',
        'description': '',
        'tags': [],
    }
    // merge empty data with received data
    const [formData, setFormData] = useState(Object.assign({}, emptyData, data));

    //helper function for handling input change
    function makeStateProps(name) {
        function updateValue(name) {
            return e => {
                let clonedFormData = {...formData};
                clonedFormData[name] = e.target.value;
                setFormData(clonedFormData);
            }
        }
        return {
            onChange: updateValue(name),
            value: formData[name]
        }
    }

    function validate(formData) {
        //validation logic here
        //use setAlert + setErrors
        //return boolean
    }
    
    return (
        <FormLayoutElement 
            data={formData}
            callback={formData => validate(formData) ? submitCallback(formData) : formData => {}}
            buttonText={extraData.submitFormButtonText ? extraData.submitFormButtonText : 'Submit'}
            alert={alert}
            waiting={waiting}
        >
            <Input type="text" name="name" label="Name"
                   inputProps={{...makeStateProps('name'), defaultValue: data['name']}}
                   smallText="A title for the problem"
                   error={errors.name}
            />
            <Textarea name="description" label="Description"
                      inputProps={{...makeStateProps('description')}}
                      smallText="A short description"
                      error={errors.description}
            />
            <SelectReactCreatable name="select-tags" label="Choose tags"
                                  smallText="Can choose one or multiple or add a new one if necessary."
                                  onChange={selectedOptions => setFormData({...formData, tags: selectedOptions})}
                                  options={extraData.tags.map(tag => getOptionFromTag(tag))}
                                  value={formData.tags}
                                  props={{isMulti: true}}
                                  error={errors.tags}
            />
        </FormLayoutElement>
    )
}