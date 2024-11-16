// Handle selection of Data View and display relevant code
function onDataViewSelect(dataView) {
    document.getElementById('selectedDataView').innerText = dataView;
    let code = "";

    try {
        if (dataView === "Sent") {
            code = generateSentCode();
        } else if (dataView === "Open") {
            code = generateOpenCode();
        } else if (dataView === "Bounce") {
            code = generateBounceCode();
        } else if (dataView === "Click") {
            code = generateClickCode();
        } else if (dataView === "Unsubscribe") {
            code = generateUnsubscribeCode();
        } else if (dataView === "Complaint") {
            code = generateComplaintCode();
        } else if (dataView === "Subscribers") {
            code = generateSubscribersCode();
        } else if (dataView === "ListSubscribers") {
            code = generateListSubscribersCode();
        } else if (dataView === "BusinessUnitUnsubscribes") {
            code = generateBusinessUnitUnsubscribesCode();
        } else {
            throw new Error("Invalid Data View selected");
        }

        document.getElementById('code-editor').innerText = code;
        document.getElementById('code-editor').textContent = decodeHTML(code);
        document.querySelector('.code-editor-container').style.display = 'block';
        Prism.highlightAll(); // Syntax highlighting

    } catch (ex) {
        showError(`Error loading code: ${ex.message}`);
    }
}

function generateSentCode() {
    return `
< script runat="server" >
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_Sent";
        var folderName = "Data View"; // The folder name is now "Data View"

        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName);
        // Write result to console
        Write(result);
    } catch (ex) {
        // Catch and log any errors that occur
        Write(Stringify(ex));
    }

    // Function to retrieve the ID of a folder by name
    function RetrieveFolderID(folderName) {
        var folderID = null;
        // Define filter to retrieve folder by name
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        // Retrieve folder based on filter
        var folders = Folder.Retrieve(filter);
        // If folder is found, set folderID
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension
    function createDataExtension(dataExtensionName, folderName) {
        // Initialize WSProxy API
        var api = new Script.Util.WSProxy();

        // Set the client ID for API request
        api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

        // Retrieve folder ID using provided folderName
        var folderID = RetrieveFolderID(folderName);
        // If folder not found, throw error
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                { "CustomerKey":"AccountID", "Name": "AccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"OYBAccountID", "Name": "OYBAccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"JobID", "Name": "JobID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"ListID", "Name": "ListID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BatchID", "Name": "BatchID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberID", "Name": "SubscriberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"EventDate", "Name": "EventDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"Domain", "Name": "Domain", "FieldType": "Text", "MaxLength": 128, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"TriggererSendDefinitionObjectID", "Name": "TriggererSendDefinitionObjectID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"TriggeredSendCustomerKey", "Name": "TriggeredSendCustomerKey", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</ script >`;
}
function generateBusinessUnitUnsubscribesCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_BusinessUnitUnsubscribes"; // Name of the Data View
        var folderName = "Data View"; // Folder where the Data Extension will be created

        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName);
        // Write result to console
        Write(result);
    } catch (ex) {
        // Catch and log any errors that occur
        Write(Stringify(ex));
    }

    // Function to retrieve the ID of a folder by name
    function RetrieveFolderID(folderName) {
        var folderID = null;
        // Define filter to retrieve folder by name
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        // Retrieve folder based on filter
        var folders = Folder.Retrieve(filter);
        // If folder is found, set folderID
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension
    function createDataExtension(dataExtensionName, folderName) {
        // Initialize WSProxy API
        var api = new Script.Util.WSProxy();

        // Set the client ID for API request
        api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

        // Retrieve folder ID using provided folderName
        var folderID = RetrieveFolderID(folderName);
        // If folder not found, throw error
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                // Define fields for BusinessUnitUnsubscribes Data Extension
                { "CustomerKey": "BusinessUnitID", "Name": "BusinessUnitID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SubscriberID", "Name": "SubscriberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "UnsubDateUTC", "Name": "UnsubDateUTC", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "UnsubReason", "Name": "UnsubReason", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>
`;
}
function generateOpenCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_Open"; // Name of the Data View
        var folderName = "Data View"; // Folder where the Data Extension will be created

        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName);
        // Write result to console
        Write(result);
    } catch (ex) {
        // Catch and log any errors that occur
        Write(Stringify(ex));
    }

    // Function to retrieve the ID of a folder by name
    function RetrieveFolderID(folderName) {
        var folderID = null;
        // Define filter to retrieve folder by name
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        // Retrieve folder based on filter
        var folders = Folder.Retrieve(filter);
        // If folder is found, set folderID
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension
    function createDataExtension(dataExtensionName, folderName) {
        // Initialize WSProxy API
        var api = new Script.Util.WSProxy();

        // Set the client ID for API request
        api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

        // Retrieve folder ID using provided folderName
        var folderID = RetrieveFolderID(folderName);
        // If folder not found, throw error
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                // Define fields for Dataview Open Data Extension
                { "CustomerKey":"AccountID", "Name": "AccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"OYBAccountID", "Name": "OYBAccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"JobID", "Name": "JobID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"ListID", "Name": "ListID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BatchID", "Name": "BatchID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberID", "Name": "SubscriberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"EventDate", "Name": "EventDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"Domain", "Name": "Domain", "FieldType": "Text", "MaxLength": 128, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"TriggererSendDefinitionObjectID", "Name": "TriggererSendDefinitionObjectID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"TriggeredSendCustomerKey", "Name": "TriggeredSendCustomerKey", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"IsUnique", "Name": "IsUnique", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>
`;
}


function generateBounceCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_Bounce"; // Name of the Data View
        var folderName = "Data View"; // Folder where the Data Extension will be created

        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName);
        // Write result to console
        Write(result);
    } catch (ex) {
        // Catch and log any errors that occur
        Write(Stringify(ex));
    }

    // Function to retrieve the ID of a folder by name
    function RetrieveFolderID(folderName) {
        var folderID = null;
        // Define filter to retrieve folder by name
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        // Retrieve folder based on filter
        var folders = Folder.Retrieve(filter);
        // If folder is found, set folderID
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension
    function createDataExtension(dataExtensionName, folderName) {
        // Initialize WSProxy API
        var api = new Script.Util.WSProxy();

        // Set the client ID for API request
        api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

        // Retrieve folder ID using provided folderName
        var folderID = RetrieveFolderID(folderName);
        // If folder not found, throw error
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                // Define fields for Dataview Bounce Data Extension
                { "CustomerKey":"AccountID", "Name": "AccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"OYBAccountID", "Name": "OYBAccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"JobID", "Name": "JobID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"ListID", "Name": "ListID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BatchID", "Name": "BatchID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberID", "Name": "SubscriberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"EventDate", "Name": "EventDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"Domain", "Name": "Domain", "FieldType": "Text", "MaxLength": 128, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"TriggererSendDefinitionObjectID", "Name": "TriggererSendDefinitionObjectID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"TriggeredSendCustomerKey", "Name": "TriggeredSendCustomerKey", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"IsUnique", "Name": "IsUnique", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BounceCategoryID", "Name": "BounceCategoryID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BounceCategory", "Name": "BounceCategory", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BounceSubcategoryID", "Name": "BounceSubcategoryID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BounceSubcategory", "Name": "BounceSubcategory", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BounceTypeID", "Name": "BounceTypeID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BounceType", "Name": "BounceType", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SMTPBounceReason", "Name": "SMTPBounceReason", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SMTPMessage", "Name": "SMTPMessage", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SMTPCode", "Name": "SMTPCode", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"IsFalseBounce", "Name": "IsFalseBounce", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>
`;
}

function generateClickCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_Click"; // Name of the Data View
        var folderName = "Data View"; // Folder where the Data Extension will be created

        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName);
        // Write result to console
        Write(result);
    } catch (ex) {
        // Catch and log any errors that occur
        Write(Stringify(ex));
    }

    // Function to retrieve the ID of a folder by name
    function RetrieveFolderID(folderName) {
        var folderID = null;
        // Define filter to retrieve folder by name
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        // Retrieve folder based on filter
        var folders = Folder.Retrieve(filter);
        // If folder is found, set folderID
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension
    function createDataExtension(dataExtensionName, folderName) {
        // Initialize WSProxy API
        var api = new Script.Util.WSProxy();

        // Set the client ID for API request
        api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

        // Retrieve folder ID using provided folderName
        var folderID = RetrieveFolderID(folderName);
        // If folder not found, throw error
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                // Define fields for Dataview Click Data Extension
                { "CustomerKey":"AccountID", "Name": "AccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"OYBAccountID", "Name": "OYBAccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"JobID", "Name": "JobID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"ListID", "Name": "ListID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BatchID", "Name": "BatchID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberID", "Name": "SubscriberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"EventDate", "Name": "EventDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"Domain", "Name": "Domain", "FieldType": "Text", "MaxLength": 128, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"TriggererSendDefinitionObjectID", "Name": "TriggererSendDefinitionObjectID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"TriggeredSendCustomerKey", "Name": "TriggeredSendCustomerKey", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"IsUnique", "Name": "IsUnique", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"URL", "Name": "URL", "FieldType": "Text", "MaxLength": 900, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"LinkName", "Name": "LinkName", "FieldType": "Text", "MaxLength": 1024, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"LinkContent", "Name": "LinkContent", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>
 `;
}

function generateComplaintCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_Complaint"; // Name of the Data View
        var folderName = "Data View"; // Folder where the Data Extension will be created

        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName);
        // Write result to console
        Write(result);
    } catch (ex) {
        // Catch and log any errors that occur
        Write(Stringify(ex));
    }

    // Function to retrieve the ID of a folder by name
    function RetrieveFolderID(folderName) {
        var folderID = null;
        // Define filter to retrieve folder by name
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        // Retrieve folder based on filter
        var folders = Folder.Retrieve(filter);
        // If folder is found, set folderID
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension
    function createDataExtension(dataExtensionName, folderName) {
        // Initialize WSProxy API
        var api = new Script.Util.WSProxy();

        // Set the client ID for API request
        api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

        // Retrieve folder ID using provided folderName
        var folderID = RetrieveFolderID(folderName);
        // If folder not found, throw error
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                // Define fields for Dataview Complaint Data Extension
                { "CustomerKey":"AccountID", "Name": "AccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"OYBAccountID", "Name": "OYBAccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"JobID", "Name": "JobID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"ListID", "Name": "ListID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BatchID", "Name": "BatchID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberID", "Name": "SubscriberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"EventDate", "Name": "EventDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"Domain", "Name": "Domain", "FieldType": "Text", "MaxLength": 128, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"IsUnique", "Name": "IsUnique", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>
 `;
}

function generateUnsubscribeCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_Unsubscribe"; // Name of the Data View
        var folderName = "Data View"; // Folder where the Data Extension will be created

        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName);
        // Write result to console
        Write(result);
    } catch (ex) {
        // Catch and log any errors that occur
        Write(Stringify(ex));
    }

    // Function to retrieve the ID of a folder by name
    function RetrieveFolderID(folderName) {
        var folderID = null;
        // Define filter to retrieve folder by name
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        // Retrieve folder based on filter
        var folders = Folder.Retrieve(filter);
        // If folder is found, set folderID
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension
    function createDataExtension(dataExtensionName, folderName) {
        // Initialize WSProxy API
        var api = new Script.Util.WSProxy();

        // Set the client ID for API request
        api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

        // Retrieve folder ID using provided folderName
        var folderID = RetrieveFolderID(folderName);
        // If folder not found, throw error
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                // Define fields for Dataview Unsubscribe Data Extension
                { "CustomerKey":"AccountID", "Name": "AccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"OYBAccountID", "Name": "OYBAccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"JobID", "Name": "JobID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"ListID", "Name": "ListID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BatchID", "Name": "BatchID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberID", "Name": "SubscriberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"EventDate", "Name": "EventDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"Domain", "Name": "Domain", "FieldType": "Text", "MaxLength": 128, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"IsUnique", "Name": "IsUnique", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>`;
}

function generateSubscribersCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_Subscribers"; // Name of the Data View
        var folderName = "Data View"; // Folder where the Data Extension will be created

        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName);
        // Write result to console
        Write(result);
    } catch (ex) {
        // Catch and log any errors that occur
        Write(Stringify(ex));
    }

    // Function to retrieve the ID of a folder by name
    function RetrieveFolderID(folderName) {
        var folderID = null;
        // Define filter to retrieve folder by name
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        // Retrieve folder based on filter
        var folders = Folder.Retrieve(filter);
        // If folder is found, set folderID
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension
    function createDataExtension(dataExtensionName, folderName) {
        // Initialize WSProxy API
        var api = new Script.Util.WSProxy();

        // Set the client ID for API request
        api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

        // Retrieve folder ID using provided folderName
        var folderID = RetrieveFolderID(folderName);
        // If folder not found, throw error
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                // Define fields for Dataview Subscribers Data Extension
                { "CustomerKey":"SubscriberID", "Name": "SubscriberID", "FieldType": "Number", "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey":"SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"DateUndeliverable", "Name": "DateUndeliverable", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"DateJoined", "Name": "DateJoined", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"DateUnsubscribed", "Name": "DateUnsubscribed", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"Domain", "Name": "Domain", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"EmailAddress", "Name": "EmailAddress", "FieldType": "EmailAddress", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"BounceCount", "Name": "BounceCount", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberType", "Name": "SubscriberType", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"Status", "Name": "Status", "FieldType": "Text", "MaxLength": 12, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"Locale", "Name": "Locale", "FieldType": "Locale", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>`;
}

function generateListSubscribersCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_ListSubscribers"; // Name of the Data View
        var folderName = "Data View"; // Folder where the Data Extension will be created

        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName);
        // Write result to console
        Write(result);
    } catch (ex) {
        // Catch and log any errors that occur
        Write(Stringify(ex));
    }

    // Function to retrieve the ID of a folder by name
    function RetrieveFolderID(folderName) {
        var folderID = null;
        // Define filter to retrieve folder by name
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        // Retrieve folder based on filter
        var folders = Folder.Retrieve(filter);
        // If folder is found, set folderID
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension
    function createDataExtension(dataExtensionName, folderName) {
        // Initialize WSProxy API
        var api = new Script.Util.WSProxy();

        // Set the client ID for API request
        api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

        // Retrieve folder ID using provided folderName
        var folderID = RetrieveFolderID(folderName);
        // If folder not found, throw error
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                // Define fields for Dataview List Subscribers Data Extension
                { "CustomerKey":"SubscriberID", "Name": "SubscriberID", "FieldType": "Number", "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey":"SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"AddedBy", "Name": "AddedBy", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"AddMethod", "Name": "AddMethod", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"CreatedDate", "Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"DateUnsubscribed", "Name": "DateUnsubscribed", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"EmailAddress", "Name": "EmailAddress", "FieldType": "EmailAddress", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"ListID", "Name": "ListID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"ListName", "Name": "ListName", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"ListType", "Name": "ListType", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"Status", "Name": "Status", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey":"SubscriberType", "Name": "SubscriberType", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>`;
}

// Decodes HTML entities
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// Show error message to the user
function showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-toast";
    errorDiv.innerText = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show success message (for copying code)
function showSuccess(message) {
    const successDiv = document.createElement("div");
    successDiv.className = "success-toast";
    successDiv.innerText = message;
    document.body.appendChild(successDiv);
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Copy code to clipboard
function copyCode() {
    const code = document.getElementById('code-editor').innerText;
    navigator.clipboard.writeText(code).then(() => {
        showSuccess("Code copied to clipboard!");
    }).catch(() => {
        showError("Failed to copy code.");
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Get the first radio button in the .data-view-list
    const firstRadioButton = document.querySelector('.data-view-list input[type="radio"]');

    if (firstRadioButton) {
        firstRadioButton.checked = true; // Set the first radio button as checked by default
    }

    // Optional: If you want to trigger any event (e.g., change) after selecting the first item
    if (firstRadioButton) {
        const changeEvent = new Event('change');
        firstRadioButton.dispatchEvent(changeEvent);
    }

    // You can add more JavaScript logic here for other functionalities if needed
});

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
}, false);

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'u' || event.key === 'U')) {
        event.preventDefault();
    }
});
