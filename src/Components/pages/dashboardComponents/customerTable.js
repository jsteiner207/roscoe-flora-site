import React from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { CircularProgress, Typography } from '@material-ui/core';
import moment from "moment";
//import { fullBlack } from "material-ui/styles/colors";

class Example extends React.Component {

  state = {
    page: 0,
    count: 1,
    data: [["Loading Data..."]],
    isLoading: false
  };

  componentDidMount() {
    this.getData();
  }

  // get data
  getData = () => {
    this.setState({ isLoading: true });
    this.xhrRequest().then(res => {
      this.setState({ data: res.data, isLoading: false, count: res.total });
    });
  }

  // mock async function
  xhrRequest = () => {

    return new Promise((resolve, reject) => {
      let data=[
        //{Id : Number ,Name: String,Email:String,Message : String,v: String}
    
    ];
    axios.get('https://vast-wave-57983.herokuapp.com/api/customers')
          .then(function(response){
              var setRows=[];
              
    
    
             setRows.push(response.data);
             setRows=setRows.find(elementType=> elementType=Array);
             setRows.forEach(element=> data.push(element))
             
              
                 console.log('data from axiospost ',data);
                  
           })
           .catch(function(error){
                  console.log(error);
              });
           
    
    //console.log("this is the data 1step way from axios",data);

      const total = data.length;  // mock record count from server
       
      

      setTimeout(() => {
        resolve({
          data, total
        });
      }, 2500);

    });

  }

  changePage = (page) => {
    this.setState({
      isLoading: true,
    });
    this.xhrRequest(`/myApiServer?page=${page}`).then(res => {
      this.setState({
        isLoading: false,
        page: page,
        data: res.data,
        count: res.total,
      });
    });
  };

  render() {

    const columns = [
      {
       name: "first_name",
       label: "First Name",
       options: {
        filter: true,
        sort: true,
       }
      },
      {
        name: "last_name",
        label: "Last Name",
        options: {
         filter: true,
         sort: true,
        }
       },
      {
       name: "email_name",
       label: "E-Mail",
       options: {
        filter: true,
        sort: false,
       }
      },
      {
       name: "phone_number",
       label: "Phone",
       options: {
        filter: true,
        sort: true,
       }
      },{
        name: "date_scheduled",
        label: "Initail Contact Date", //think of a cleaver word here
        options: {
         filter: true,
         sort: true,
         
         customBodyRender: (value, tableMeta, updateValue) => {

          var x = moment(value).format('MMMM Do YYYY, h:mm')

          return (x);
        }
      }
       },
     ];    var { data, page, count, isLoading } = this.state;

    const options = {
      
      filterType: 'checkbox',
      selectableRows: 'none',
      filter: true,
      filterType: 'dropdown',
      responsive: 'scrollMaxHeight',
      serverSide: false,
      count: count,
      page: page,
      //onRowsDelete ,

   /*    Callback function that triggers when row(s) are deleted. 
      function(rowsDeleted: object(lookup: {[dataIndex]: boolean}, 
        data: arrayOfObjects: {index: number, dataIndex: number})) => 
        void OR false (Returning false prevents row deletion.) */
      
      
      
      
        onTableChange: (action, tableState) => {

        console.log(action, tableState);
        // a developer could react to change on an action basis or
        // examine the state as a whole and do whatever they want

        switch (action) {
          case 'changePage':
            this.changePage(tableState.page);
            break;
        }
      }
    };
    return (
      <div>
        <MUIDataTable title={<Typography variant="title">
          
          {isLoading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
          </Typography>
          } data={data} columns={columns} options={options} />
      </div>
    );

  }
}

export default Example;