<script runat="server">
  Platform.Load("Core","1");
  
  
  //=================================================================================//
  // Reteireive Category Id from the folder based on Name and ContentType
  // We are using complex filter because we might be 
  // using the same name across different assets
  //=================================================================================//
  function RetrieveCategortyIDForAFolder(name,contentType){
    
    // Assign variables to a filter operations for left filter
    var propName1="Name";
    var simpleOperator1="equals";
    var propValue1=name;
    
    // Assign variables to a filter operations for right filter
    var propName2="ContentType";
    var simpleOperator2="equals";
    var propValue2=contentType;
    
    var filter1={
      Property:propName1,SimpleOperator:simpleOperator1,Value:propValue1};
    
    var filter2={
      Property:propName2,SimpleOperator:simpleOperator2,Value:propValue2};
    
    var complexFilter = {
      LeftOperand: filter1,LogicalOperator: "AND",RightOperand: filter2};
    
    var results = Folder.Retrieve(complexFilter);
    return results[0].ID;
  }
  
  //=================================================================================//
  // Create a sub-folder inside a parent folder based on category ID
  // Assign a javascript variable with all prop required for creating the folder
  //=================================================================================//
  function CreateAfolder(name,customerkey,description,contentType,allowChildren,parentFolderCategoryID){
    
    var newFolder = {
      "Name" : name,
      "CustomerKey" : customerkey,
      "Description" : description,
      "ContentType" : contentType,
      "IsActive" : "true",
      "IsEditable" : "true",
      "AllowChildren" : allowChildren,
      "ParentFolderID" : parentFolderCategoryID
    };
    
    var status = Folder.Add(newFolder);
    return status;
  }
  
  //===============================================================================================================//
  // Query this data view in Automation Studio to find the subscribers sent emails from your Marketing Cloud account.
  // View subscribers who were sent emails from your account by querying the _Sent data view. 
  // Records dating back six months from the day the query runs are available.
  // Dates and times are stored in Central Standard Time. Daylight Savings Time is not observed.
  //===============================================================================================================//
  function CreateSentDataViews(CategoryID)
  {
       var deObj = {
        "CustomerKey" : "Dataview_Sent",
        "Name" : "Dataview_Sent",
        "CategoryID":CategoryID,
        "Fields" : [
          { "Name" : "AccountID", "FieldType" : "Number" },
          { "Name" : "OYBAccountID", "FieldType" : "Number"},
          { "Name" : "JobID", "FieldType" : "Number" },
          { "Name" : "ListID", "FieldType" : "Number" },
          { "Name" : "BatchID", "FieldType" : "Number" },
          { "Name" : "SubscriberID", "FieldType" : "Number" },
          { "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254 },
          { "Name" : "EventDate", "FieldType" : "Date"},
          { "Name" : "Domain", "FieldType" : "Text","MaxLength" : 128},
          { "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text","MaxLength" : 36},
          { "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text","MaxLength" : 36}
        ]
    };

    var myDE = DataExtension.Add(deObj);
    return myDE;
  }
  
  //===============================================================================================================//
  // Query this data view in Automation Studio to find the subscribers open emails from your Marketing Cloud account.
  // View email opens for your account by querying the _Open data view. 
  // Records dating back six months from the day the query runs are available.
  // Dates and times are stored in Central Standard Time. Daylight Savings Time is not observed.
  // To view time-related data in your time zone, set time zone user preferences.
  //===============================================================================================================//
  function CreateOpenDataViews(CategoryID)
  {
       var deObj = {
        "CustomerKey" : "Dataview_Open",
        "Name" : "Dataview_Open",
        "CategoryID":CategoryID,
        "Fields" : [
          { "Name" : "AccountID", "FieldType" : "Number" },
          { "Name" : "OYBAccountID", "FieldType" : "Number"},
          { "Name" : "JobID", "FieldType" : "Number" },
          { "Name" : "ListID", "FieldType" : "Number" },
          { "Name" : "BatchID", "FieldType" : "Number" },
          { "Name" : "SubscriberID", "FieldType" : "Number" },
          { "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254 },
          { "Name" : "EventDate", "FieldType" : "Date"},
          { "Name" : "Domain", "FieldType" : "Text","MaxLength" : 128},
          { "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text","MaxLength" : 36},
          { "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text","MaxLength" : 36},
          { "Name" : "IsUnique", "FieldType" : "Boolean"}
        ]
    };

    var myDE = DataExtension.Add(deObj);
    return myDE;
  }
  
   //===============================================================================================================//
  // Query this data view in Automation Studio to find the subscribers click emails from your Marketing Cloud account.
  // VView clicks for links in emails sent from your account by querying the _Click data view
  // Records dating back six months from the day the query runs are available.
  // Dates and times are stored in Central Standard Time. Daylight Savings Time is not observed.
  // To view time-related data in your time zone, set time zone user preferences.
  //===============================================================================================================//
  function CreateClickDataViews(CategoryID)
  {
       var deObj = {
        "CustomerKey" : "Dataview_Click",
        "Name" : "Dataview_Click",
        "CategoryID":CategoryID,
        "Fields" : [
          { "Name" : "AccountID", "FieldType" : "Number" },
          { "Name" : "OYBAccountID", "FieldType" : "Number"},
          { "Name" : "JobID", "FieldType" : "Number" },
          { "Name" : "ListID", "FieldType" : "Number" },
          { "Name" : "BatchID", "FieldType" : "Number" },
          { "Name" : "SubscriberID", "FieldType" : "Number" },
          { "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254 },
          { "Name" : "EventDate", "FieldType" : "Date"},
          { "Name" : "Domain", "FieldType" : "Text","MaxLength" : 128},
          { "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text","MaxLength" : 36},
          { "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text","MaxLength" : 36},
          { "Name" : "IsUnique", "FieldType" : "Boolean"},
          { "Name" : "URL", "FieldType" : "Text","MaxLength" : 900},
          { "Name" : "LinkName", "FieldType" : "Text","MaxLength" : 1024},
          { "Name" : "LinkContent", "FieldType" : "Text"}
        ]
    };

    var myDE = DataExtension.Add(deObj);
    return myDE;
  }
  
  
  //===============================================================================================================//
  // To view bounce data for emails from your Marketing Cloud account, query the _bounce data view in Automation Studio.
  // View bounce data for emails from your account by querying the _bounce data view
  // Records dating back six months from the day the query runs are available.
  // Dates and times are stored in Central Standard Time. Daylight Savings Time is not observed.
  // To view time-related data in your time zone, set time zone user preferences.
  //===============================================================================================================//
  function CreateBounceDataViews(CategoryID)
  {
       var deObj = {
        "CustomerKey" : "Dataview_Bounce",
        "Name" : "Dataview_Bounce",
        "CategoryID":CategoryID,
        "Fields" : [
          { "Name" : "AccountID", "FieldType" : "Number" },
          { "Name" : "OYBAccountID", "FieldType" : "Number"},
          { "Name" : "JobID", "FieldType" : "Number" },
          { "Name" : "ListID", "FieldType" : "Number" },
          { "Name" : "BatchID", "FieldType" : "Number" },
          { "Name" : "SubscriberID", "FieldType" : "Number" },
          { "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254 },
          { "Name" : "EventDate", "FieldType" : "Date"},
          { "Name" : "Domain", "FieldType" : "Text","MaxLength" : 128},
          { "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text","MaxLength" : 36},
          { "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text","MaxLength" : 36},
          { "Name" : "IsUnique", "FieldType" : "Boolean"},
          { "Name" : "BounceCategoryID", "FieldType" : "Number" },
          { "Name" : "BounceCategory", "FieldType" : "Text","MaxLength" : 50},
          { "Name" : "BounceSubcategoryID", "FieldType" : "Number" },
          { "Name" : "BounceSubcategory", "FieldType" : "Text","MaxLength" : 50},
          { "Name" : "BounceTypeID", "FieldType" : "Number" },
          { "Name" : "BounceType", "FieldType" : "Text","MaxLength" : 50},
          { "Name" : "SMTPBounceReason", "FieldType" : "Text"},
          { "Name" : "SMTPMessage", "FieldType" : "Text"},
          { "Name" : "SMTPCode", "FieldType" : "Number" },
          { "Name" : "IsFalseBounce", "FieldType" : "Boolean"}
        ]
    };

    var myDE = DataExtension.Add(deObj);
    return myDE;
  }
  
  
  //=============================================================================================
  // Create a query activity for sent data view
  //=============================================================================================
  
  function CreateSentDataViewQuery()
  {
    var queryDef = {
    Name : "Sent Data View Query Definition",
    CustomerKey : "sentdataviewQueryDefinition",
    CategoryID : RetrieveCategortyIDForAFolder("DataViews_query","queryactivity"),
    TargetUpdateType : "Overwrite",
    TargetType : "DE",
    Target : {
        Name : "Dataview_Sent",
        CustomerKey : "Dataview_Sent"
    },
    QueryText : "Select * from [_Sent]"
  };

    var status = QueryDefinition.Add(queryDef);
    return status;
  }
  
  //=============================================================================================
  // Create a query activity for open data view
  //=============================================================================================
  
  function CreateOpenDataViewQuery()
  {
    var queryDef = {
    Name : "Open Data View Query Definition",
    CustomerKey : "opendataviewQueryDefinition",
    CategoryID : RetrieveCategortyIDForAFolder("DataViews_query","queryactivity"),
    TargetUpdateType : "Overwrite",
    TargetType : "DE",
    Target : {
        Name : "Dataview_Open",
        CustomerKey : "Dataview_Open"
    },
    QueryText : "Select * from [_Open]"
  };

    var status = QueryDefinition.Add(queryDef);
     return status;
  }
  
   //=============================================================================================
  // Create a query activity for click data view
  //=============================================================================================
  
  function CreateClickDataViewQuery()
  {
    var queryDef = {
    Name : "Click Data View Query Definition",
    CustomerKey : "clickdataviewQueryDefinition",
    CategoryID : RetrieveCategortyIDForAFolder("DataViews_query","queryactivity"),
    TargetUpdateType : "Overwrite",
    TargetType : "DE",
    Target : {
        Name : "Dataview_Click",
        CustomerKey : "Dataview_Click"
    },
    QueryText : "Select * from [_Click]"
  };

    var status = QueryDefinition.Add(queryDef);
     return status;
  }
  
  //=============================================================================================
  // Create a query activity for bounce data view
  //=============================================================================================
  
  function CreateBounceDataViewQuery()
  {
    var queryDef = {
    Name : "Bounce Data View Query Definition",
    CustomerKey : "bouncedataviewQueryDefinition",
    CategoryID : RetrieveCategortyIDForAFolder("DataViews_query","queryactivity"),
    TargetUpdateType : "Overwrite",
    TargetType : "DE",
    Target : {
        Name : "Dataview_Bounce",
        CustomerKey : "Dataview_Bounce"
    },
    QueryText : "Select * from [_Bounce]"
  };

    var status = QueryDefinition.Add(queryDef);
     return status;
  }
  
  try{
    
    //====================================================================================================================//
    // ******** Data Extension for Data views starts here ******** 
    //====================================================================================================================//
    
    // Parent Folder definiton
    var parentFolderCategoryID= RetrieveCategortyIDForAFolder("Data Extensions","dataextension");    
    
    // Dataviews folder deinition
    var status=CreateAfolder("DataViews","DataViews","DataViews folder","dataextension","true",parentFolderCategoryID);
    
    var DataViewsCategoryID=RetrieveCategortyIDForAFolder("DataViews","dataextension"); 
    
    // Create data view data extensions
    var sentDataView=CreateSentDataViews(DataViewsCategoryID);
    var openDataView=CreateOpenDataViews(DataViewsCategoryID);
    var clickDataView=CreateClickDataViews(DataViewsCategoryID);
    var bounceDataView=CreateBounceDataViews(DataViewsCategoryID);
    //======================================================================================================================//
    // ******** Data Extension for Data views ends here ******** 
    //======================================================================================================================//
    
    
    //====================================================================================================================//
    // ******** Query Activity for Data views starts here ******** 
    //====================================================================================================================//
    // Parent Folder definiton
    var parentFolderCategoryID= RetrieveCategortyIDForAFolder("Query","queryactivity");    
    
    // Dataviews query folder deinition
    var status=CreateAfolder("DataViews_query","DataViews_query","DataViews_query folder","queryactivity","true",parentFolderCategoryID);
    
    var DataViewsCategoryID=RetrieveCategortyIDForAFolder("DataViews_query","queryactivity"); 
    
    var sentStatus=CreateSentDataViewQuery();
    var openStatus=CreateOpenDataViewQuery();
    var clickStatus=CreateClickDataViewQuery();
    var bounceStatus=CreateBounceDataViewQuery();
    //====================================================================================================================//
    // ******** Query Activity for Data views ends here ******** 
    //====================================================================================================================//
    
 
    
  }
  catch(ex){
    Write(Stringify(ex));
  }
</script>
