// Handle selection of Data View and display relevant code
function onDataViewSelect(dataView) {
    document.getElementById('selectedDataView').innerText = dataView;
    let code = "";

    try {
        if (dataView === "Sent") {
            code = generateSentCode();
        } else if (dataView === "Job") {
            code = generateJobCode();
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
        } else if (dataView === "NotSent") {
            code = generateNotSentCode();
        } else if (dataView === "ImportDefinition") {
            code = generateImportDefinitionCode();
        } else if (dataView === "Journey") {
            code = generateJourneyCode();
        } else if (dataView === "JourneyActivity") {
            code = generateJourneyActivityCode();
        } else if (dataView === "AutomationActivityInstance") {
            code = generateAutomationActivityInstanceCode();
        } else if (dataView === "AutomationInstance") {
            code = generateAutomationInstanceCode();
        } else if (dataView === "SMSMessageTracking") {
            code = generateSMSMessageTrackingCode();
        } else if (dataView === "SMSSubscriptionLog") {
            code = generateSMSSubscriptionLogCode();
        } else if (dataView === "UndeliverableSMS") {
            code = generateUndeliverableSMSCode();
        } else if (dataView === "MobileAddress") {
            code = generateMobileAddressCode();
        } else if (dataView === "MobileSubscription") {
            code = generateMobileSubscriptionCode();
        } else if (dataView === "ChatMessagingSubscription") {
            code = generateChatMessagingSubscriptionCode();
        } else if (dataView === "MobilePush") {
            code = generateMobilePushCode();
        } else if (dataView === "MobileOrphanContact") {
            code = generateMobileOrphanContactCode();
        } else if (dataView === "ImportDefinitionResults") {
            code = generateImportDefinitionResultsCode();
        } else if (dataView === "AuditTrailAcivityLog") {
            code = generateAuditTrailAcivityLogCode();
        } else if (dataView === "AuditTrailAccessLog") {
            code = generateAuditTrailAccessLogCode();
        } else if (dataView === "Account") {
            code = generateAccountCode();
        } else if (dataView === "AccountUser") {
            code = generateAccountUserCode();
        } else if (dataView === "BusinessUnit") {
            code = generateBusinessUnitCode();
        } else if (dataView === "GlobalUnsubscribeCategory") {
            code = generateGlobalUnsubscribeCategoryCode();
        } else if (dataView === "BounceEvent") {
            code = generateBounceEventCode();
        } else if (dataView === "ClickEvent") {
            code = generateClickEventCode();
        }else if (dataView === "OpenEvent") {
            code = generateOpenEventCode();
        }else {
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


function generateOpenEventCode(){
    return `
    <script runat="server">
      Platform.Load("core", "1");
    
      try {
        // Set the name of the SOAP object to "OpenEvent".
        var soapObject = "OpenEvent";
        // Define Data Extension and folder names
        var dataExtensionName = soapObject;
        var folderName = "APIObjects"; // Folder name
    
        // Describe the SOAP object and retrieve metadata
        var describeResponse = DescribeSoapObject(soapObject);
    
        // Extract the properties array from the describeResponse
        var properties = describeResponse.Results[0].Properties;
    
        // Fetch the retrieveable properties
        var cols = FetchRetrieveableProperties(properties);
    
        // Define fields for the Data Extension
        var fields = DefineFieldsForDataExtension(cols);
    
        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName, fields);
    
        // Output result to console
        Write(result);
      }
      catch (ex) {
        // Enhanced error handling with more details
        Write("Error: " + ex.message);
        Write("Error Description: " + ex.description );
        Write("Stack Trace: " + ex.stack );
    }
    
      // Function to describe SOAP object and retrieve metadata
      function DescribeSoapObject(soapObjectname) {
        try {
          var api = new Script.Util.WSProxy();
          var response = api.describe(soapObjectname);
          if (response && response.Results && response.Results.length > 0) {
            return response;
          } else {
            throw new Error("No metadata found for object: " + soapObjectname);
          }
        } catch (ex) {
          throw new Error("DescribeSOAPObject failed: " + ex.message);
        }
      }
    
      // Function to fetch retrievable properties from SOAP metadata
      function FetchRetrieveableProperties(soapMetaData) {
        var propertiesName = [];
    
        for (var i in soapMetaData) {
          var name = soapMetaData[i].Name;
          var dataType = soapMetaData[i].DataType;
          var isRetrievable = soapMetaData[i].IsRetrievable;
    
          if (isRetrievable === true) {
            propertiesName.push({ Name: name, DataType: dataType });
          }
        }
    
        return propertiesName;
      }
    
      // Function to retrieve Folder ID by name
      function RetrieveFolderID(folderName) {
        try {
          var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
          };
    
          var folders = Folder.Retrieve(filter);
    
          if (folders && folders.length > 0) {
            return folders[0].ID;
          } else {
            throw new Error("Folder not found: " + folderName);
          }
        } catch (ex) {
          throw new Error("RetrieveFolderID failed: " + ex.message);
        }
      }
    
      // Function to create a Data Extension with given fields
      function createDataExtension(dataExtensionName, folderName, fields) {
        try {
          var api = new Script.Util.WSProxy();
          api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });
    
          var folderID = RetrieveFolderID(folderName);
    
          var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, 
            "Fields": fields
          };
    
          var result = api.createItem("DataExtension", config);
          return Stringify(result);
        } catch (ex) {
          throw new Error("createDataExtension failed: " + ex.message);
        }
      }
    
      // Function to define fields for the Data Extension based on the retrieveable properties
      // Function to define fields for the Data Extension based on the retrieveable properties
        // Function to define fields for the Data Extension based on the retrieveable properties
        function DefineFieldsForDataExtension(cols) {
        var fields = [];
    
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
    
            // Check if the field name contains a period (.)
            if (col.Name.indexOf('.') === -1) {
            // If no period in the name, define the field
            var row = {
                "CustomerKey": col.Name,
                "Name": col.Name,
                "FieldType": "Text",
                "MaxLength": 255,
                "IsPrimaryKey": false,
                "IsRequired": false
            };
    
            fields.push(row);
            } else {
            // Optionally log the ignored field
            //Write("Ignoring field with period in name: " + col.Name);
            }
        }
    
        return fields;
        }
    
    
    
      // Function to determine field type based on the DataType
      function GetFieldType(dataType) {
        switch (dataType) {
          case "String":
            return "Text";
          case "Int32":  
            return "Number";
          case "Boolean":
            return "Boolean";
          case "Decimal":
          case "Double":
            return "Decimal";
          case "Date":
            return "Date";
          default:
            return "Text"; // Default to Text if the type is unknown
        }
      }
    </script>
                                `;
}

function generateClickEventCode(){
    return `
    <script runat="server">
      Platform.Load("core", "1");
    
      try {
        // Set the name of the SOAP object to "BounceEvent".
        var soapObject = "ClickEvent";
        // Define Data Extension and folder names
        var dataExtensionName = soapObject;
        var folderName = "APIObjects"; // Folder name
    
        // Describe the SOAP object and retrieve metadata
        var describeResponse = DescribeSoapObject(soapObject);
    
        // Extract the properties array from the describeResponse
        var properties = describeResponse.Results[0].Properties;
    
        // Fetch the retrieveable properties
        var cols = FetchRetrieveableProperties(properties);
    
        // Define fields for the Data Extension
        var fields = DefineFieldsForDataExtension(cols);
    
        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName, fields);
    
        // Output result to console
        Write(result);
      }
      catch (ex) {
        // Enhanced error handling with more details
        Write("Error: " + ex.message);
        Write("Error Description: " + ex.description );
        Write("Stack Trace: " + ex.stack );
    }
    
      // Function to describe SOAP object and retrieve metadata
      function DescribeSoapObject(soapObjectname) {
        try {
          var api = new Script.Util.WSProxy();
          var response = api.describe(soapObjectname);
          if (response && response.Results && response.Results.length > 0) {
            return response;
          } else {
            throw new Error("No metadata found for object: " + soapObjectname);
          }
        } catch (ex) {
          throw new Error("DescribeSOAPObject failed: " + ex.message);
        }
      }
    
      // Function to fetch retrievable properties from SOAP metadata
      function FetchRetrieveableProperties(soapMetaData) {
        var propertiesName = [];
    
        for (var i in soapMetaData) {
          var name = soapMetaData[i].Name;
          var dataType = soapMetaData[i].DataType;
          var isRetrievable = soapMetaData[i].IsRetrievable;
    
          if (isRetrievable === true) {
            propertiesName.push({ Name: name, DataType: dataType });
          }
        }
    
        return propertiesName;
      }
    
      // Function to retrieve Folder ID by name
      function RetrieveFolderID(folderName) {
        try {
          var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
          };
    
          var folders = Folder.Retrieve(filter);
    
          if (folders && folders.length > 0) {
            return folders[0].ID;
          } else {
            throw new Error("Folder not found: " + folderName);
          }
        } catch (ex) {
          throw new Error("RetrieveFolderID failed: " + ex.message);
        }
      }
    
      // Function to create a Data Extension with given fields
      function createDataExtension(dataExtensionName, folderName, fields) {
        try {
          var api = new Script.Util.WSProxy();
          api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });
    
          var folderID = RetrieveFolderID(folderName);
    
          var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, 
            "Fields": fields
          };
    
          var result = api.createItem("DataExtension", config);
          return Stringify(result);
        } catch (ex) {
          throw new Error("createDataExtension failed: " + ex.message);
        }
      }
    
      // Function to define fields for the Data Extension based on the retrieveable properties
      // Function to define fields for the Data Extension based on the retrieveable properties
        // Function to define fields for the Data Extension based on the retrieveable properties
        function DefineFieldsForDataExtension(cols) {
        var fields = [];
    
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
    
            // Check if the field name contains a period (.)
            if (col.Name.indexOf('.') === -1) {
            // If no period in the name, define the field
            var row = {
                "CustomerKey": col.Name,
                "Name": col.Name,
                "FieldType": "Text",
                "MaxLength": 255,
                "IsPrimaryKey": false,
                "IsRequired": false
            };
    
            fields.push(row);
            } else {
            // Optionally log the ignored field
            //Write("Ignoring field with period in name: " + col.Name);
            }
        }
    
        return fields;
        }
    
    
    
      // Function to determine field type based on the DataType
      function GetFieldType(dataType) {
        switch (dataType) {
          case "String":
            return "Text";
          case "Int32":  
            return "Number";
          case "Boolean":
            return "Boolean";
          case "Decimal":
          case "Double":
            return "Decimal";
          case "Date":
            return "Date";
          default:
            return "Text"; // Default to Text if the type is unknown
        }
      }
    </script>
                                `;
}

function generateBounceEventCode() {
    return `
    <script runat="server">
      Platform.Load("core", "1");
    
      try {
        // Set the name of the SOAP object to "BounceEvent".
        var soapObject = "BounceEvent";
        // Define Data Extension and folder names
        var dataExtensionName = soapObject;
        var folderName = "APIObjects"; // Folder name
    
        // Describe the SOAP object and retrieve metadata
        var describeResponse = DescribeSoapObject(soapObject);
    
        // Extract the properties array from the describeResponse
        var properties = describeResponse.Results[0].Properties;
    
        // Fetch the retrieveable properties
        var cols = FetchRetrieveableProperties(properties);
    
        // Define fields for the Data Extension
        var fields = DefineFieldsForDataExtension(cols);
    
        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName, fields);
    
        // Output result to console
        Write(result);
      }
      catch (ex) {
        // Enhanced error handling with more details
        Write("Error: " + ex.message);
        Write("Error Description: " + ex.description );
        Write("Stack Trace: " + ex.stack );
    }
    
      // Function to describe SOAP object and retrieve metadata
      function DescribeSoapObject(soapObjectname) {
        try {
          var api = new Script.Util.WSProxy();
          var response = api.describe(soapObjectname);
          if (response && response.Results && response.Results.length > 0) {
            return response;
          } else {
            throw new Error("No metadata found for object: " + soapObjectname);
          }
        } catch (ex) {
          throw new Error("DescribeSOAPObject failed: " + ex.message);
        }
      }
    
      // Function to fetch retrievable properties from SOAP metadata
      function FetchRetrieveableProperties(soapMetaData) {
        var propertiesName = [];
    
        for (var i in soapMetaData) {
          var name = soapMetaData[i].Name;
          var dataType = soapMetaData[i].DataType;
          var isRetrievable = soapMetaData[i].IsRetrievable;
    
          if (isRetrievable === true) {
            propertiesName.push({ Name: name, DataType: dataType });
          }
        }
    
        return propertiesName;
      }
    
      // Function to retrieve Folder ID by name
      function RetrieveFolderID(folderName) {
        try {
          var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
          };
    
          var folders = Folder.Retrieve(filter);
    
          if (folders && folders.length > 0) {
            return folders[0].ID;
          } else {
            throw new Error("Folder not found: " + folderName);
          }
        } catch (ex) {
          throw new Error("RetrieveFolderID failed: " + ex.message);
        }
      }
    
      // Function to create a Data Extension with given fields
      function createDataExtension(dataExtensionName, folderName, fields) {
        try {
          var api = new Script.Util.WSProxy();
          api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });
    
          var folderID = RetrieveFolderID(folderName);
    
          var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, 
            "Fields": fields
          };
    
          var result = api.createItem("DataExtension", config);
          return Stringify(result);
        } catch (ex) {
          throw new Error("createDataExtension failed: " + ex.message);
        }
      }
    
      // Function to define fields for the Data Extension based on the retrieveable properties
      // Function to define fields for the Data Extension based on the retrieveable properties
        // Function to define fields for the Data Extension based on the retrieveable properties
        function DefineFieldsForDataExtension(cols) {
        var fields = [];
    
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
    
            // Check if the field name contains a period (.)
            if (col.Name.indexOf('.') === -1) {
            // If no period in the name, define the field
            var row = {
                "CustomerKey": col.Name,
                "Name": col.Name,
                "FieldType": "Text",
                "MaxLength": 255,
                "IsPrimaryKey": false,
                "IsRequired": false
            };
    
            fields.push(row);
            } else {
            // Optionally log the ignored field
            //Write("Ignoring field with period in name: " + col.Name);
            }
        }
    
        return fields;
        }
    
    
    
      // Function to determine field type based on the DataType
      function GetFieldType(dataType) {
        switch (dataType) {
          case "String":
            return "Text";
          case "Int32":  
            return "Number";
          case "Boolean":
            return "Boolean";
          case "Decimal":
          case "Double":
            return "Decimal";
          case "Date":
            return "Date";
          default:
            return "Text"; // Default to Text if the type is unknown
        }
      }
    </script>
                                `;
}
function generateGlobalUnsubscribeCategoryCode() {
    return `
    <script runat="server">
      Platform.Load("core", "1");
    
      try {
        // Set the name of the SOAP object to "GlobalUnsubscribeCategory".
        var soapObject = "GlobalUnsubscribeCategory";
        // Define Data Extension and folder names
        var dataExtensionName = soapObject;
        var folderName = "APIObjects"; // Folder name
    
        // Describe the SOAP object and retrieve metadata
        var describeResponse = DescribeSoapObject(soapObject);
    
        // Extract the properties array from the describeResponse
        var properties = describeResponse.Results[0].Properties;
    
        // Fetch the retrieveable properties
        var cols = FetchRetrieveableProperties(properties);
    
        // Define fields for the Data Extension
        var fields = DefineFieldsForDataExtension(cols);
    
        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName, fields);
    
        // Output result to console
        Write(result);
      }
      catch (ex) {
        // Enhanced error handling with more details
        Write("Error: " + ex.message);
        Write("Error Description: " + ex.description );
        Write("Stack Trace: " + ex.stack );
    }
    
      // Function to describe SOAP object and retrieve metadata
      function DescribeSoapObject(soapObjectname) {
        try {
          var api = new Script.Util.WSProxy();
          var response = api.describe(soapObjectname);
          if (response && response.Results && response.Results.length > 0) {
            return response;
          } else {
            throw new Error("No metadata found for object: " + soapObjectname);
          }
        } catch (ex) {
          throw new Error("DescribeSOAPObject failed: " + ex.message);
        }
      }
    
      // Function to fetch retrievable properties from SOAP metadata
      function FetchRetrieveableProperties(soapMetaData) {
        var propertiesName = [];
    
        for (var i in soapMetaData) {
          var name = soapMetaData[i].Name;
          var dataType = soapMetaData[i].DataType;
          var isRetrievable = soapMetaData[i].IsRetrievable;
    
          if (isRetrievable === true) {
            propertiesName.push({ Name: name, DataType: dataType });
          }
        }
    
        return propertiesName;
      }
    
      // Function to retrieve Folder ID by name
      function RetrieveFolderID(folderName) {
        try {
          var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
          };
    
          var folders = Folder.Retrieve(filter);
    
          if (folders && folders.length > 0) {
            return folders[0].ID;
          } else {
            throw new Error("Folder not found: " + folderName);
          }
        } catch (ex) {
          throw new Error("RetrieveFolderID failed: " + ex.message);
        }
      }
    
      // Function to create a Data Extension with given fields
      function createDataExtension(dataExtensionName, folderName, fields) {
        try {
          var api = new Script.Util.WSProxy();
          api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });
    
          var folderID = RetrieveFolderID(folderName);
    
          var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, 
            "Fields": fields
          };
    
          var result = api.createItem("DataExtension", config);
          return Stringify(result);
        } catch (ex) {
          throw new Error("createDataExtension failed: " + ex.message);
        }
      }
    
      // Function to define fields for the Data Extension based on the retrieveable properties
      // Function to define fields for the Data Extension based on the retrieveable properties
        // Function to define fields for the Data Extension based on the retrieveable properties
        function DefineFieldsForDataExtension(cols) {
        var fields = [];
    
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
    
            // Check if the field name contains a period (.)
            if (col.Name.indexOf('.') === -1) {
            // If no period in the name, define the field
            var row = {
                "CustomerKey": col.Name,
                "Name": col.Name,
                "FieldType": "Text",
                "MaxLength": 200,
                "IsPrimaryKey": false,
                "IsRequired": false
            };
    
            fields.push(row);
            } else {
            // Optionally log the ignored field
            //Write("Ignoring field with period in name: " + col.Name);
            }
        }
    
        return fields;
        }
    
    
    
      // Function to determine field type based on the DataType
      function GetFieldType(dataType) {
        switch (dataType) {
          case "String":
            return "Text";
          case "Int32":  
            return "Number";
          case "Boolean":
            return "Boolean";
          case "Decimal":
          case "Double":
            return "Decimal";
          case "Date":
            return "Date";
          default:
            return "Text"; // Default to Text if the type is unknown
        }
      }
    </script>
                                `;
}

function generateBusinessUnitCode() {
    return `
    <script runat="server">
      Platform.Load("core", "1");
    
      try {
        // Set the name of the SOAP object to "BusinessUnit".
        var soapObject = "BusinessUnit";
        // Define Data Extension and folder names
        var dataExtensionName = soapObject;
        var folderName = "APIObjects"; // Folder name
    
        // Describe the SOAP object and retrieve metadata
        var describeResponse = DescribeSoapObject(soapObject);
    
        // Extract the properties array from the describeResponse
        var properties = describeResponse.Results[0].Properties;
    
        // Fetch the retrieveable properties
        var cols = FetchRetrieveableProperties(properties);
    
        // Define fields for the Data Extension
        var fields = DefineFieldsForDataExtension(cols);
    
        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName, fields);
    
        // Output result to console
        Write(result);
      }
      catch (ex) {
        // Enhanced error handling with more details
        Write("Error: " + ex.message);
        Write("Error Description: " + ex.description );
        Write("Stack Trace: " + ex.stack );
    }
    
      // Function to describe SOAP object and retrieve metadata
      function DescribeSoapObject(soapObjectname) {
        try {
          var api = new Script.Util.WSProxy();
          var response = api.describe(soapObjectname);
          if (response && response.Results && response.Results.length > 0) {
            return response;
          } else {
            throw new Error("No metadata found for object: " + soapObjectname);
          }
        } catch (ex) {
          throw new Error("DescribeSOAPObject failed: " + ex.message);
        }
      }
    
      // Function to fetch retrievable properties from SOAP metadata
      function FetchRetrieveableProperties(soapMetaData) {
        var propertiesName = [];
    
        for (var i in soapMetaData) {
          var name = soapMetaData[i].Name;
          var dataType = soapMetaData[i].DataType;
          var isRetrievable = soapMetaData[i].IsRetrievable;
    
          if (isRetrievable === true) {
            propertiesName.push({ Name: name, DataType: dataType });
          }
        }
    
        return propertiesName;
      }
    
      // Function to retrieve Folder ID by name
      function RetrieveFolderID(folderName) {
        try {
          var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
          };
    
          var folders = Folder.Retrieve(filter);
    
          if (folders && folders.length > 0) {
            return folders[0].ID;
          } else {
            throw new Error("Folder not found: " + folderName);
          }
        } catch (ex) {
          throw new Error("RetrieveFolderID failed: " + ex.message);
        }
      }
    
      // Function to create a Data Extension with given fields
      function createDataExtension(dataExtensionName, folderName, fields) {
        try {
          var api = new Script.Util.WSProxy();
          api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });
    
          var folderID = RetrieveFolderID(folderName);
    
          var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, 
            "Fields": fields
          };
    
          var result = api.createItem("DataExtension", config);
          return Stringify(result);
        } catch (ex) {
          throw new Error("createDataExtension failed: " + ex.message);
        }
      }
    
      // Function to define fields for the Data Extension based on the retrieveable properties
      // Function to define fields for the Data Extension based on the retrieveable properties
        // Function to define fields for the Data Extension based on the retrieveable properties
        function DefineFieldsForDataExtension(cols) {
        var fields = [];
    
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
    
            // Check if the field name contains a period (.)
            if (col.Name.indexOf('.') === -1) {
            // If no period in the name, define the field
            var row = {
                "CustomerKey": col.Name,
                "Name": col.Name,
                "FieldType": "Text",
                "MaxLength": 200,
                "IsPrimaryKey": false,
                "IsRequired": false
            };
    
            fields.push(row);
            } else {
            // Optionally log the ignored field
            //Write("Ignoring field with period in name: " + col.Name);
            }
        }
    
        return fields;
        }
    
    
    
      // Function to determine field type based on the DataType
      function GetFieldType(dataType) {
        switch (dataType) {
          case "String":
            return "Text";
          case "Int32":  
            return "Number";
          case "Boolean":
            return "Boolean";
          case "Decimal":
          case "Double":
            return "Decimal";
          case "Date":
            return "Date";
          default:
            return "Text"; // Default to Text if the type is unknown
        }
      }
    </script>
                                `;
}

function generateAccountUserCode() {
    return `
    <script runat="server">
      Platform.Load("core", "1");
    
      try {
        // Set the name of the SOAP object to "AccountUser".
        var soapObject = "AccountUser";
        // Define Data Extension and folder names
        var dataExtensionName = soapObject;
        var folderName = "APIObjects"; // Folder name
    
        // Describe the SOAP object and retrieve metadata
        var describeResponse = DescribeSoapObject(soapObject);
    
        // Extract the properties array from the describeResponse
        var properties = describeResponse.Results[0].Properties;
    
        // Fetch the retrieveable properties
        var cols = FetchRetrieveableProperties(properties);
    
        // Define fields for the Data Extension
        var fields = DefineFieldsForDataExtension(cols);
    
        // Create Data Extension and retrieve result
        var result = createDataExtension(dataExtensionName, folderName, fields);
    
        // Output result to console
        Write(result);
      }
      catch (ex) {
        // Enhanced error handling with more details
        Write("Error: " + ex.message);
        Write("Error Description: " + ex.description );
        Write("Stack Trace: " + ex.stack );
    }
    
      // Function to describe SOAP object and retrieve metadata
      function DescribeSoapObject(soapObjectname) {
        try {
          var api = new Script.Util.WSProxy();
          var response = api.describe(soapObjectname);
          if (response && response.Results && response.Results.length > 0) {
            return response;
          } else {
            throw new Error("No metadata found for object: " + soapObjectname);
          }
        } catch (ex) {
          throw new Error("DescribeSOAPObject failed: " + ex.message);
        }
      }
    
      // Function to fetch retrievable properties from SOAP metadata
      function FetchRetrieveableProperties(soapMetaData) {
        var propertiesName = [];
    
        for (var i in soapMetaData) {
          var name = soapMetaData[i].Name;
          var dataType = soapMetaData[i].DataType;
          var isRetrievable = soapMetaData[i].IsRetrievable;
    
          if (isRetrievable === true) {
            propertiesName.push({ Name: name, DataType: dataType });
          }
        }
    
        return propertiesName;
      }
    
      // Function to retrieve Folder ID by name
      function RetrieveFolderID(folderName) {
        try {
          var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
          };
    
          var folders = Folder.Retrieve(filter);
    
          if (folders && folders.length > 0) {
            return folders[0].ID;
          } else {
            throw new Error("Folder not found: " + folderName);
          }
        } catch (ex) {
          throw new Error("RetrieveFolderID failed: " + ex.message);
        }
      }
    
      // Function to create a Data Extension with given fields
      function createDataExtension(dataExtensionName, folderName, fields) {
        try {
          var api = new Script.Util.WSProxy();
          api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });
    
          var folderID = RetrieveFolderID(folderName);
    
          var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, 
            "Fields": fields
          };
    
          var result = api.createItem("DataExtension", config);
          return Stringify(result);
        } catch (ex) {
          throw new Error("createDataExtension failed: " + ex.message);
        }
      }
    
      // Function to define fields for the Data Extension based on the retrieveable properties
      // Function to define fields for the Data Extension based on the retrieveable properties
        // Function to define fields for the Data Extension based on the retrieveable properties
        function DefineFieldsForDataExtension(cols) {
        var fields = [];
    
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
    
            // Check if the field name contains a period (.)
            if (col.Name.indexOf('.') === -1) {
            // If no period in the name, define the field
            var row = {
                "CustomerKey": col.Name,
                "Name": col.Name,
                "FieldType": "Text",
                "MaxLength": 200,
                "IsPrimaryKey": false,
                "IsRequired": false
            };
    
            fields.push(row);
            } else {
            // Optionally log the ignored field
            //Write("Ignoring field with period in name: " + col.Name);
            }
        }
    
        return fields;
        }
    
    
    
      // Function to determine field type based on the DataType
      function GetFieldType(dataType) {
        switch (dataType) {
          case "String":
            return "Text";
          case "Int32":  
            return "Number";
          case "Boolean":
            return "Boolean";
          case "Decimal":
          case "Double":
            return "Decimal";
          case "Date":
            return "Date";
          default:
            return "Text"; // Default to Text if the type is unknown
        }
      }
    </script>
                                `;
}

function generateAccountCode() {
    return `
<script runat="server">
  Platform.Load("core", "1");

  try {
    // Set the name of the SOAP object to "Account".
    var soapObject = "Account";
    // Define Data Extension and folder names
    var dataExtensionName = soapObject;
    var folderName = "APIObjects"; // Folder name

    // Describe the SOAP object and retrieve metadata
    var describeResponse = DescribeSoapObject(soapObject);

    // Extract the properties array from the describeResponse
    var properties = describeResponse.Results[0].Properties;

    // Fetch the retrieveable properties
    var cols = FetchRetrieveableProperties(properties);

    // Define fields for the Data Extension
    var fields = DefineFieldsForDataExtension(cols);

    // Create Data Extension and retrieve result
    var result = createDataExtension(dataExtensionName, folderName, fields);

    // Output result to console
    Write(result);
  }
  catch (ex) {
    // Enhanced error handling with more details
    Write("Error: " + ex.message);
    Write("Error Description: " + ex.description );
    Write("Stack Trace: " + ex.stack );
  }

  // Function to describe SOAP object and retrieve metadata
  function DescribeSoapObject(soapObjectname) {
    try {
      var api = new Script.Util.WSProxy();
      var response = api.describe(soapObjectname);
      if (response && response.Results && response.Results.length > 0) {
        return response;
      } else {
        throw new Error("No metadata found for object: " + soapObjectname);
      }
    } catch (ex) {
      throw new Error("DescribeSOAPObject failed: " + ex.message);
    }
  }

  // Function to fetch retrievable properties from SOAP metadata
  function FetchRetrieveableProperties(soapMetaData) {
    var propertiesName = [];

    for (var i in soapMetaData) {
      var name = soapMetaData[i].Name;
      var dataType = soapMetaData[i].DataType;
      var isRetrievable = soapMetaData[i].IsRetrievable;

      if (isRetrievable === true) {
        propertiesName.push({ Name: name, DataType: dataType });
      }
    }

    return propertiesName;
  }

  // Function to retrieve Folder ID by name
  function RetrieveFolderID(folderName) {
    try {
      var filter = {
        Property: "Name",
        SimpleOperator: "equals",
        Value: folderName
      };

      var folders = Folder.Retrieve(filter);

      if (folders && folders.length > 0) {
        return folders[0].ID;
      } else {
        throw new Error("Folder not found: " + folderName);
      }
    } catch (ex) {
      throw new Error("RetrieveFolderID failed: " + ex.message);
    }
  }

  // Function to create a Data Extension with given fields
  function createDataExtension(dataExtensionName, folderName, fields) {
    try {
      var api = new Script.Util.WSProxy();
      api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

      var folderID = RetrieveFolderID(folderName);

      var config = {
        "CustomerKey": dataExtensionName,
        "Name": dataExtensionName,
        "CategoryID": folderID, 
        "Fields": fields
      };

      var result = api.createItem("DataExtension", config);
      return Stringify(result);
    } catch (ex) {
      throw new Error("createDataExtension failed: " + ex.message);
    }
  }

  // Function to define fields for the Data Extension based on the retrieveable properties
  // Function to define fields for the Data Extension based on the retrieveable properties
    // Function to define fields for the Data Extension based on the retrieveable properties
    function DefineFieldsForDataExtension(cols) {
    var fields = [];

    for (var i = 0; i < cols.length; i++) {
        var col = cols[i];

        // Check if the field name contains a period (.)
        if (col.Name.indexOf('.') === -1) {
        // If no period in the name, define the field
        var row = {
            "CustomerKey": col.Name,
            "Name": col.Name,
            "FieldType": "Text",
            "MaxLength": 200,
            "IsPrimaryKey": false,
            "IsRequired": false
        };

        fields.push(row);
        } else {
        // Optionally log the ignored field
        //Write("Ignoring field with period in name: " + col.Name);
        }
    }

    return fields;
    }



  // Function to determine field type based on the DataType
  function GetFieldType(dataType) {
    switch (dataType) {
      case "String":
        return "Text";
      case "Int32":  
        return "Number";
      case "Boolean":
        return "Boolean";
      case "Decimal":
      case "Double":
        return "Decimal";
      case "Date":
        return "Date";
      default:
        return "Text"; // Default to Text if the type is unknown
    }
  }
</script>
                            `;
}

function generateAuditTrailAccessLogCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Audit_Trail_Access_Log";
        var folderName = "Monitoring";

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
                // Define fields for Data Extension
                {"CustomerKey":"User","Name":"User","FieldType":"Text","MaxLength":100,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"UserName","Name":"UserName","FieldType":"Text","MaxLength":100,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"AccessDate","Name":"AccessDate","FieldType":"Date","IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"FromIP","Name":"FromIP","FieldType":"Text","MaxLength":15,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"SecurityEventTypeID","Name":"SecurityEventTypeID","FieldType":"Number","IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"SecurityEventType","Name":"SecurityEventType","FieldType":"Text","MaxLength":100,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"LoginStatusID","Name":"LoginStatusID","FieldType":"Number","IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"LoginStatusName","Name":"LoginStatusName","FieldType":"Text","MaxLength":100,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"UserAgent","Name":"UserAgent","FieldType":"Number","IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"Event Source","Name":"Event Source","FieldType":"Text","MaxLength":100,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"InsertedDate","Name":"InsertedDate","FieldType":"Date","IsPrimaryKey":false,"IsRequired":false,"DefaultValue":"getdate()"}
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }

</script>

    
                        `;
}

function generateAuditTrailAcivityLogCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Audit_Trail_Log";
        var folderName = "Monitoring";

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
                // Define fields for Data Extension
                { "CustomerKey":"CreatedDate","Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey":false,"IsRequired":false },
                { "CustomerKey":"EnterpriseId","Name":"EID","FieldType":"Number","IsPrimaryKey":false,"IsRequired":false},
                { "CustomerKey":"MemberId","Name":"MID","FieldType":"Number","IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"UserID","Name":"UserID","FieldType":"Number","IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"EmployeeID","Name":"EmployeeID","FieldType":"Number","IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"EmployeeName","Name":"EmployeeName","FieldType":"Text","MaxLength":100,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"ObjectTypeID","Name":"ObjectTypeID","FieldType":"Number","IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"ObjectTypeName","Name":"ObjectTypeName","FieldType":"Text","MaxLength":100,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"OperationID","Name":"OperationID","FieldType":"Number","IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"OperationName","Name":"OperationName","FieldType":"Text","MaxLength":100,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"ObjectID","Name":"ObjectID","FieldType":"Text","MaxLength":36,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"ObjectName","Name":"ObjectName","FieldType":"Text","MaxLength":100,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"TransactionID","Name":"TransactionID","FieldType":"Text","MaxLength":36,"IsPrimaryKey":false,"IsRequired":false},
                {"CustomerKey":"InsertedDate","Name":"InsertedDate","FieldType":"Date","IsPrimaryKey":false,"IsRequired":false,"DefaultValue":"getdate()"}
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }

</script>

    
                        `;
}

function generateImportDefinitionResultsCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "ImportDefinitionResults";  // Update name of Data Extension as needed
        var folderName = "Monitoring"; // Folder name remains "Monitoring"

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
                // Define fields for Data Extension (same as in your original template, updated)
                { "CustomerKey": "ObjectID", "Name": "ObjectID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "TaskResultID", "Name": "TaskResultID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ImportStatus", "Name": "ImportStatus", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ImportType", "Name": "ImportType", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "TotalRows", "Name": "TotalRows", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "NumberErrors", "Name": "NumberErrors", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "NumberRestricted", "Name": "NumberRestricted", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "NumberDuplicated", "Name": "NumberDuplicated", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "NumberSuccessful", "Name": "NumberSuccessful", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "DestinationID", "Name": "DestinationID", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "StartDate", "Name": "StartDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "EndDate", "Name": "EndDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ImportDefinitionCustomerKey", "Name": "ImportDefinitionCustomerKey", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "FileSpec", "Name": "FileSpec", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

                        `;
}

function generateMobileOrphanContactCode() {
    return `
<script runat="server">
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "MobileOrphanContact";
        var folderName = "Data View"; // Folder for Data Views

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
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        var folders = Folder.Retrieve(filter);
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension for MobileOrphanContact Data View
    function createDataExtension(dataExtensionName, folderName) {
        var api = new Script.Util.WSProxy();

        // Retrieve folder ID
        var folderID = RetrieveFolderID(folderName);
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID,
            "Fields": [
                { "CustomerKey": "ContactID", "Name": "ContactID", "FieldType": "Number", "Precision": 18, "Scale": 0, "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "ContactKey", "Name": "ContactKey", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AddressID", "Name": "AddressID", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedDate", "Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": true }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

    
                        `;
}

function generateMobilePushCode() {
    return `
<script runat="server">
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_MobilePush";
        var folderName = "Data View"; // Folder for Data Views

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
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        var folders = Folder.Retrieve(filter);
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension for the MobilePush Data View
    function createDataExtension(dataExtensionName, folderName) {
        var api = new Script.Util.WSProxy();

        // Retrieve folder ID
        var folderID = RetrieveFolderID(folderName);
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID,
           "Fields": [
                { "CustomerKey": "DeviceID", "Name": "DeviceID", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ContactID", "Name": "ContactID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "APID", "Name": "APID", "FieldType": "Text", "MaxLength": 38, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Status", "Name": "Status", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Source", "Name": "Source", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SourceObjectId", "Name": "SourceObjectId", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Platform", "Name": "Platform", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "PlatformVersion", "Name": "PlatformVersion", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Alias", "Name": "Alias", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutStatusID", "Name": "OptOutStatusID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutMethodID", "Name": "OptOutMethodID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutDate", "Name": "OptOutDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptInStatusID", "Name": "OptInStatusID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptInMethodID", "Name": "OptInMethodID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptInDate", "Name": "OptInDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Channel", "Name": "Channel", "FieldType": "Text", "MaxLength": 20, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedDate", "Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedBy", "Name": "CreatedBy", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedDate", "Name": "ModifiedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedBy", "Name": "ModifiedBy", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "City", "Name": "City", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "State", "Name": "State", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ZipCode", "Name": "ZipCode", "FieldType": "Text", "MaxLength": 20, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "FirstName", "Name": "FirstName", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "LastName", "Name": "LastName", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "UTCOffset", "Name": "UTCOffset", "FieldType": "Decimal", "Precision": 18, "Scale": 6, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "IsHonorDST", "Name": "IsHonorDST", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SystemToken", "Name": "SystemToken", "FieldType": "Text", "MaxLength": 4000, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ProviderToken", "Name": "ProviderToken", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Badge", "Name": "Badge", "FieldType": "Number", "Precision": 18, "Scale": 0, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "LocationEnabled", "Name": "LocationEnabled", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "TimeZone", "Name": "TimeZone", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Device", "Name": "Device", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "HardwareId", "Name": "HardwareId", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "DeviceType", "Name": "DeviceType", "FieldType": "Text", "MaxLength": 20, "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

                    `;
}

function generateChatMessagingSubscriptionCode() {
    return `
<script runat="server">
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_ChatMessagingSubscription";
        var folderName = "Data View"; // Folder for Data Views

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
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        var folders = Folder.Retrieve(filter);
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension for the ChatMessagingSubscription Data View
    function createDataExtension(dataExtensionName, folderName) {
        var api = new Script.Util.WSProxy();

        // Retrieve folder ID
        var folderID = RetrieveFolderID(folderName);
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID,
            "Fields": [
                { "CustomerKey": "MobileNumber", "Name": "MobileNumber", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ChannelId", "Name": "ChannelId", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ChannelType", "Name": "ChannelType", "FieldType": "Text", "MaxLength": 20, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutStatusID", "Name": "OptOutStatusID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutMethodID", "Name": "OptOutMethodID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutDate", "Name": "OptOutDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptinStatusID", "Name": "OptinStatusID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptinMethodID", "Name": "OptinMethodID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptinDate", "Name": "OptinDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Source", "Name": "Source", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SourceObjectId", "Name": "SourceObjectId", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedDate", "Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedBy", "Name": "CreatedBy", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedDate", "Name": "ModifiedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedBy", "Name": "ModifiedBy", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>
                `;
}

function generateMobileSubscriptionCode() {
    return `
<script runat="server">
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_MobileSubscription";
        var folderName = "Data View"; // Folder for Data Views

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
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        var folders = Folder.Retrieve(filter);
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension for the MobileSubscription Data View
    function createDataExtension(dataExtensionName, folderName) {
        var api = new Script.Util.WSProxy();

        // Retrieve folder ID
        var folderID = RetrieveFolderID(folderName);
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID,
            "Fields": [
                { "CustomerKey": "MobileNumber", "Name": "MobileNumber", "FieldType": "Text", "MaxLength": 15, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SubscriptionDefinitionID", "Name": "SubscriptionDefinitionID", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutStatusID", "Name": "OptOutStatusID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutMethodID", "Name": "OptOutMethodID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutDate", "Name": "OptOutDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptInStatusID", "Name": "OptInStatusID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptInMethodID", "Name": "OptInMethodID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptInDate", "Name": "OptInDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Source", "Name": "Source", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedDate", "Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SourceObjectId", "Name": "SourceObjectId", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedBy", "Name": "CreatedBy", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedDate", "Name": "ModifiedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedBy", "Name": "ModifiedBy", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>


                `;
}

function generateMobileAddressCode() {
    return `
    <script runat="server">
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_MobileAddress";
        var folderName = "Data View"; // Folder for Data Views

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
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        var folders = Folder.Retrieve(filter);
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension for the MobileAddress Data View
    function createDataExtension(dataExtensionName, folderName) {
        var api = new Script.Util.WSProxy();

        // Retrieve folder ID
        var folderID = RetrieveFolderID(folderName);
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID,
            "Fields": [
                { "CustomerKey": "MobileNumber", "Name": "MobileNumber", "FieldType": "Text", "MaxLength": 15, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ContactID", "Name": "ContactID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Status", "Name": "Status", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Source", "Name": "Source", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SourceObjectId", "Name": "SourceObjectId", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Priority", "Name": "Priority", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Channel", "Name": "Channel", "FieldType": "Text", "MaxLength": 20, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CarrierID", "Name": "CarrierID", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CountryCode", "Name": "CountryCode", "FieldType": "Text", "MaxLength": 2, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedDate", "Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedBy", "Name": "CreatedBy", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedDate", "Name": "ModifiedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedBy", "Name": "ModifiedBy", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "City", "Name": "City", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "State", "Name": "State", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ZipCode", "Name": "ZipCode", "FieldType": "Text", "MaxLength": 20, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "FirstName", "Name": "FirstName", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "LastName", "Name": "LastName", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "UTCOffset", "Name": "UTCOffset", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "IsHonorDST", "Name": "IsHonorDST", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

                `;
}

function generateUndeliverableSMSCode() {
    return `
<script runat="server">
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_UndeliverableSMS";
        var folderName = "Data View"; // Folder for Data Views

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
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        var folders = Folder.Retrieve(filter);
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension for the UndeliverableSMS Data View
    function createDataExtension(dataExtensionName, folderName) {
        var api = new Script.Util.WSProxy();

        // Retrieve folder ID
        var folderID = RetrieveFolderID(folderName);
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID,
            "Fields": [
                { "CustomerKey": "MobileNumber", "Name": "MobileNumber", "FieldType": "Phone", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Undeliverable", "Name": "Undeliverable", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "BounceCount", "Name": "BounceCount", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "FirstBounceDate", "Name": "FirstBounceDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "HoldDate", "Name": "HoldDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

            `;
}

function generateSMSSubscriptionLogCode() {
    return `
<script runat="server">
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_SMSSubscriptionLog";
        var folderName = "Data View"; // Folder for Data Views

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
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        var folders = Folder.Retrieve(filter);
        if (folders && folders.length > 0) {
            folderID = folders[0].ID;
        }
        return folderID;
    }

    // Function to create a Data Extension for the SMSSubscriptionLog Data View
    function createDataExtension(dataExtensionName, folderName) {
        var api = new Script.Util.WSProxy();

        // Retrieve folder ID
        var folderID = RetrieveFolderID(folderName);
        if (!folderID) {
            throw new Error("Folder not found: " + folderName);
        }

        // Define Data Extension configuration
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID,
            "Fields": [
                { "CustomerKey": "MobileNumber", "Name": "MobileNumber", "FieldType": "Phone", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 255, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "LogDate", "Name": "LogDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "MobileSubscriptionID", "Name": "MobileSubscriptionID", "FieldType": "Number", "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "SubscriptionDefinitionID", "Name": "SubscriptionDefinitionID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutStatusID", "Name": "OptOutStatusID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutMethodID", "Name": "OptOutMethodID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptOutDate", "Name": "OptOutDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptInStatusID", "Name": "OptInStatusID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptInMethodID", "Name": "OptInMethodID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OptInDate", "Name": "OptInDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Source", "Name": "Source", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedDate", "Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedDate", "Name": "ModifiedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

            `;
}

function generateSMSMessageTrackingCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_AutomationActivityInstance"; // Name of the Data Extension
        var folderName = "Data View"; // The folder name is "Data View"

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

    // Function to create a Data Extension for the Automation Activity Instance Data View
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

        // Define Data Extension configuration for the Automation Activity Instance Data View
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                { "CustomerKey": "MemberID", "Name": "MemberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "AutomationName", "Name": "AutomationName", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "AutomationCustomerKey", "Name": "AutomationCustomerKey", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "AutomationInstanceID", "Name": "AutomationInstanceID", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "ActivityType", "Name": "ActivityType", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityName", "Name": "ActivityName", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityDescription", "Name": "ActivityDescription", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ActivityCustomerKey", "Name": "ActivityCustomerKey", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityInstanceStep", "Name": "ActivityInstanceStep", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityInstanceID", "Name": "ActivityInstanceID", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "ActivityInstanceStartTime_UTC", "Name": "ActivityInstanceStartTime_UTC", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ActivityInstanceEndTime_UTC", "Name": "ActivityInstanceEndTime_UTC", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ActivityInstanceStatus", "Name": "ActivityInstanceStatus", "FieldType": "Text", "MaxLength": 256, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityInstanceStatusDetails", "Name": "ActivityInstanceStatusDetails", "FieldType": "Text", "MaxLength": 4000, "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

        `;
}

function generateAutomationActivityInstanceCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_AutomationActivityInstance"; // Name of the Data Extension
        var folderName = "Data View"; // The folder name is "Data View"

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

    // Function to create a Data Extension for the Automation Activity Instance Data View
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

        // Define Data Extension configuration for the Automation Activity Instance Data View
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                { "CustomerKey": "MemberID", "Name": "MemberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "AutomationName", "Name": "AutomationName", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "AutomationCustomerKey", "Name": "AutomationCustomerKey", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "AutomationInstanceID", "Name": "AutomationInstanceID", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "ActivityType", "Name": "ActivityType", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityName", "Name": "ActivityName", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityDescription", "Name": "ActivityDescription", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ActivityCustomerKey", "Name": "ActivityCustomerKey", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityInstanceStep", "Name": "ActivityInstanceStep", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityInstanceID", "Name": "ActivityInstanceID", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "ActivityInstanceStartTime_UTC", "Name": "ActivityInstanceStartTime_UTC", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ActivityInstanceEndTime_UTC", "Name": "ActivityInstanceEndTime_UTC", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ActivityInstanceStatus", "Name": "ActivityInstanceStatus", "FieldType": "Text", "MaxLength": 256, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityInstanceStatusDetails", "Name": "ActivityInstanceStatusDetails", "FieldType": "Text", "MaxLength": 4000, "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

    `;
}

function generateAutomationInstanceCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_AutomationInstance"; // Name of the Data Extension
        var folderName = "Data View"; // The folder name is "Data View"

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

    // Function to create a Data Extension for the Automation Instance Data View
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

        // Define Data Extension configuration for the Automation Instance Data View
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                { "CustomerKey": "MemberID", "Name": "MemberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "AutomationName", "Name": "AutomationName", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "AutomationCustomerKey", "Name": "AutomationCustomerKey", "FieldType": "Text", "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "AutomationDescription", "Name": "AutomationDescription", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AutomationType", "Name": "AutomationType", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "AutomationNotificationRecipient_Complete", "Name": "AutomationNotificationRecipient_Complete", "FieldType": "Text", "MaxLength": 500, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AutomationNotificationRecipient_Error", "Name": "AutomationNotificationRecipient_Error", "FieldType": "Text", "MaxLength": 500, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AutomationNotificationRecipient_Skip", "Name": "AutomationNotificationRecipient_Skip", "FieldType": "Text", "MaxLength": 500, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AutomationStepCount", "Name": "AutomationStepCount", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AutomationInstanceID", "Name": "AutomationInstanceID", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "AutomationInstanceIsRunOnce", "Name": "AutomationInstanceIsRunOnce", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "FilenameFromTrigger", "Name": "FilenameFromTrigger", "FieldType": "Text", "MaxLength": 4000, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AutomationInstanceScheduledTime_UTC", "Name": "AutomationInstanceScheduledTime_UTC", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AutomationInstanceStartTime_UTC", "Name": "AutomationInstanceStartTime_UTC", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AutomationInstanceEndTime_UTC", "Name": "AutomationInstanceEndTime_UTC", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AutomationInstanceStatus", "Name": "AutomationInstanceStatus", "FieldType": "Text", "MaxLength": 400, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "AutomationInstanceActivityErrorDetails", "Name": "AutomationInstanceActivityErrorDetails", "FieldType": "Text", "MaxLength": 4000, "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

    `;

}

function generateJourneyActivityCode() {
    return `
    <script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_JourneyActivity"; // Name of the Data Extension
        var folderName = "Data View"; // The folder name is "Data View"

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

    // Function to create a Data Extension for the Journey Activity Data View
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

        // Define Data Extension configuration for the Journey Activity Data View
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                { "CustomerKey": "VersionID", "Name": "VersionID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityID", "Name": "ActivityID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityName", "Name": "ActivityName", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "ActivityExternalKey", "Name": "ActivityExternalKey", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "JourneyActivityObjectID", "Name": "JourneyActivityObjectID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ActivityType", "Name": "ActivityType", "FieldType": "Text", "MaxLength": 512, "IsPrimaryKey": false, "IsRequired": true }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

    `;
}
function generateJourneyCode() {
    return `
    <script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_Journey"; // Name of the Data Extension
        var folderName = "Data View"; // The folder name is "Data View"

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

    // Function to create a Data Extension for the Journey Data View
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

        // Define Data Extension configuration for the Journey Data View
        var config = {
            "CustomerKey": dataExtensionName,
            "Name": dataExtensionName,
            "CategoryID": folderID, // Assign folderID to Data Extension
            "Fields": [
                { "CustomerKey": "VersionID", "Name": "VersionID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "JourneyID", "Name": "JourneyID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "JourneyName", "Name": "JourneyName", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "VersionNumber", "Name": "VersionNumber", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "CreatedDate", "Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": true },
                { "CustomerKey": "LastPublishedDate", "Name": "LastPublishedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedDate", "Name": "ModifiedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "JourneyStatus", "Name": "JourneyStatus", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": true }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

    `;
}
function generateImportDefinitionCode() {
    return `
   <script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "ImportDefinition";  // Change the name of the Data Extension as needed
        var folderName = "Monitoring"; // The folder name is now "Monitoring"

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
                // Define fields for Data Extension
                { "CustomerKey": "AccountID", "Name": "AccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AccountUserID", "Name": "AccountUserID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "JobID", "Name": "JobID", "FieldType": "Number", "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "EmailID", "Name": "EmailID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "FromName", "Name": "FromName", "FieldType": "Text", "MaxLength": 130, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "FromEmail", "Name": "FromEmail", "FieldType": "EmailAddress", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SchedTime", "Name": "SchedTime", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "PickupTime", "Name": "PickupTime", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "DeliveredTime", "Name": "DeliveredTime", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "TriggererSendDefinitionObjectID", "Name": "TriggererSendDefinitionObjectID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "TriggeredSendCustomerKey", "Name": "TriggeredSendCustomerKey", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "EventID", "Name": "EventID", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "IsMultipart", "Name": "IsMultipart", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "JobType", "Name": "JobType", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "JobStatus", "Name": "JobStatus", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedBy", "Name": "ModifiedBy", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedDate", "Name": "ModifiedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "EmailName", "Name": "EmailName", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "EmailSubject", "Name": "EmailSubject", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "IsWrapped", "Name": "IsWrapped", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "TestEmailAddr", "Name": "TestEmailAddr", "FieldType": "EmailAddress", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Category", "Name": "Category", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "BccEmail", "Name": "BccEmail", "FieldType": "EmailAddress", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OriginalSchedTime", "Name": "OriginalSchedTime", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedDate", "Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CharacterSet", "Name": "CharacterSet", "FieldType": "Text", "MaxLength": 30, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "IPAddress", "Name": "IPAddress", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SalesForceTotalSubscriberCount", "Name": "SalesForceTotalSubscriberCount", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SalesForceErrorSubscriberCount", "Name": "SalesForceErrorSubscriberCount", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SendType", "Name": "SendType", "FieldType": "Text", "MaxLength": 128, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "DynamicEmailSubject", "Name": "DynamicEmailSubject", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SuppressTracking", "Name": "SuppressTracking", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SendClassificationType", "Name": "SendClassificationType", "FieldType": "Text", "MaxLength": 32, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SendClassification", "Name": "SendClassification", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ResolveLinksWithCurrentData", "Name": "ResolveLinksWithCurrentData", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "EmailSendDefinition", "Name": "EmailSendDefinition", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "DeduplicateByEmail", "Name": "DeduplicateByEmail", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>

    `;
}

function generateNotSentCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        var dataExtensionName = "NotSent_DataViews"; // Name of the Data Extension
        var folderName = "Data Views"; // Folder name where the Data Extension will be created
        
        // Initialize the creation of the Data Extension
        var result = createDataExtension(dataExtensionName, folderName);
        var objectId = RetrieveDataExtension(dataExtensionName); // Retrieve the Object ID of the created Data Extension
        
        // Output the Object ID of the Data Extension to the screen
        Write(objectId);
    } catch (ex) {
        // Catch and log any errors that occur
        Write(Stringify(ex));
    }

    // Function to retrieve the ID of a folder based on its name
    function RetrieveFolderID(folderName) {
        // Define a filter to retrieve the folder by its name
        var filter = {
            Property: "Name",
            SimpleOperator: "equals",
            Value: folderName
        };
        
        // Retrieve folder based on the filter
        var results = Folder.Retrieve(filter);
        
        // If the folder is found, return the ID
        if (results && results.length > 0) {
            return results[0].ID;
        } else {
            // If the folder isn't found, return null or handle appropriately
            throw new Error("Folder not found: " + folderName);
        }
    }

    // Function to create a Data Extension with the specified fields
    function createDataExtension(dataExtensionName, folderName) {
        // Initialize the WSProxy API
        var api = new Script.Util.WSProxy();
        
        // Set the client ID for API request
        api.setClientId({ "ID": Platform.Function.AuthenticatedMemberID() });

        // Retrieve the folder ID using the folder name
        var folderID = RetrieveFolderID(folderName);

        // Define the configuration for the Data Extension
        var config = {
            "CustomerKey": dataExtensionName, // Unique identifier for the Data Extension
            "Name": dataExtensionName, // Name of the Data Extension
            "CategoryID": folderID, // Folder ID for the Data Extension
            "Fields": [
                { "CustomerKey": "ClientID", "Name": "ClientID", "FieldType": "Number" },
                { "CustomerKey": "SendID", "Name": "SendID", "FieldType": "Number" },
                { "CustomerKey": "ListID", "Name": "ListID", "FieldType": "Number" },
                { "CustomerKey": "BatchID", "Name": "BatchID", "FieldType": "Number" },
                { "CustomerKey": "SubscriberID", "Name": "SubscriberID", "FieldType": "Number" },
                { "CustomerKey": "SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254 },
                { "CustomerKey": "EmailAddress", "Name": "EmailAddress", "FieldType": "Text", "MaxLength": 500 },
                { "CustomerKey": "EventDate", "Name": "EventDate", "FieldType": "Date" },
                { "CustomerKey": "EventType", "Name": "EventType", "FieldType": "Text", "MaxLength": 128 },
                { "CustomerKey": "TriggeredSendExternalKey", "Name": "TriggeredSendExternalKey", "FieldType": "Text", "MaxLength": 36 },
                { "CustomerKey": "Reason", "Name": "Reason", "FieldType": "Text", "MaxLength": 100 }
            ]
        };

        // Create the Data Extension using WSProxy and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }

    // Function to retrieve the ObjectID of a Data Extension using its CustomerKey (ExternalKey)
    function RetrieveDataExtension(externalKey) {
        // Initialize the WSProxy API
        var api = new Script.Util.WSProxy();
        
        // Retrieve the Data Extension based on its CustomerKey (ExternalKey)
        var req = api.retrieve("DataExtension", ["ObjectID"], {
            Property: "CustomerKey",
            SimpleOperator: "equals",
            Value: externalKey
        });
        
        // Return the ObjectID of the first Data Extension result
        if (req && req.Results.length > 0) {
            return req.Results[0].ObjectID;
        } else {
            throw new Error("Data Extension not found with CustomerKey: " + externalKey);
        }
    }
</script>

`;
}
function generateJobCode() {
    return `
<script runat="server">
    // Load necessary libraries
    Platform.Load("core", "1");

    try {
        // Define Data Extension and folder names
        var dataExtensionName = "Dataview_Job";
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

    // Function to create a Data Extension for the Job Data View
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
                { "CustomerKey": "AccountID", "Name": "AccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "AccountUserID", "Name": "AccountUserID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "JobID", "Name": "JobID", "FieldType": "Number", "IsPrimaryKey": true, "IsRequired": true },
                { "CustomerKey": "EmailID", "Name": "EmailID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "FromName", "Name": "FromName", "FieldType": "Text", "MaxLength": 130, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "FromEmail", "Name": "FromEmail", "FieldType": "EmailAddress", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SchedTime", "Name": "SchedTime", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "PickupTime", "Name": "PickupTime", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "DeliveredTime", "Name": "DeliveredTime", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "TriggererSendDefinitionObjectID", "Name": "TriggererSendDefinitionObjectID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "TriggeredSendCustomerKey", "Name": "TriggeredSendCustomerKey", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "EventID", "Name": "EventID", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "IsMultipart", "Name": "IsMultipart", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "JobType", "Name": "JobType", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "JobStatus", "Name": "JobStatus", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedBy", "Name": "ModifiedBy", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ModifiedDate", "Name": "ModifiedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "EmailName", "Name": "EmailName", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "EmailSubject", "Name": "EmailSubject", "FieldType": "Text", "MaxLength": 200, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "IsWrapped", "Name": "IsWrapped", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "TestEmailAddr", "Name": "TestEmailAddr", "FieldType": "EmailAddress", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Category", "Name": "Category", "FieldType": "Text", "MaxLength": 100, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "BccEmail", "Name": "BccEmail", "FieldType": "EmailAddress", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OriginalSchedTime", "Name": "OriginalSchedTime", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CreatedDate", "Name": "CreatedDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "CharacterSet", "Name": "CharacterSet", "FieldType": "Text", "MaxLength": 30, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "IPAddress", "Name": "IPAddress", "FieldType": "Text", "MaxLength": 50, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SalesForceTotalSubscriberCount", "Name": "SalesForceTotalSubscriberCount", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SalesForceErrorSubscriberCount", "Name": "SalesForceErrorSubscriberCount", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SendType", "Name": "SendType", "FieldType": "Text", "MaxLength": 128, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "DynamicEmailSubject", "Name": "DynamicEmailSubject", "FieldType": "Text", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SuppressTracking", "Name": "SuppressTracking", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SendClassificationType", "Name": "SendClassificationType", "FieldType": "Text", "MaxLength": 32, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SendClassification", "Name": "SendClassification", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ResolveLinksWithCurrentData", "Name": "ResolveLinksWithCurrentData", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "EmailSendDefinition", "Name": "EmailSendDefinition", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "DeduplicateByEmail", "Name": "DeduplicateByEmail", "FieldType": "Boolean", "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>
`;
}
function generateSentCode() {
    return `
<script runat="server">
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
                { "CustomerKey": "AccountID", "Name": "AccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "OYBAccountID", "Name": "OYBAccountID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "JobID", "Name": "JobID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "ListID", "Name": "ListID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "BatchID", "Name": "BatchID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SubscriberID", "Name": "SubscriberID", "FieldType": "Number", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "SubscriberKey", "Name": "SubscriberKey", "FieldType": "Text", "MaxLength": 254, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "EventDate", "Name": "EventDate", "FieldType": "Date", "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "Domain", "Name": "Domain", "FieldType": "Text", "MaxLength": 128, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "TriggererSendDefinitionObjectID", "Name": "TriggererSendDefinitionObjectID", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false },
                { "CustomerKey": "TriggeredSendCustomerKey", "Name": "TriggeredSendCustomerKey", "FieldType": "Text", "MaxLength": 36, "IsPrimaryKey": false, "IsRequired": false }
            ]
        };

        // Create the Data Extension using WSProxy API and return the result
        var result = api.createItem("DataExtension", config);
        return Stringify(result);
    }
</script>
`;
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
    const codeText = document.getElementById("code-editor").textContent;
    navigator.clipboard.writeText(codeText)
        .then(() => {
            const modal = document.getElementById("copyModal");

            // Show the modal and then fade it out
            modal.classList.add("show");

            // After 3 seconds, fade out the modal
            setTimeout(() => {
                modal.classList.remove("show");
            }, 2000); // 2 seconds to keep the modal visible before fading out
        })
        .catch(err => console.error("Error copying code: ", err));
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
