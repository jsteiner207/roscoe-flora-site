import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table'

export default function Service() {
   
   //axios iumport price table then send data to table via variables
   
   
   
    return(
        <div>
        <Container>
           <Table>
               <thead>
                   <tr>
                       <th>Service</th>
                       <th>Location(s)</th>
                       <th>Outfit Limit</th>
                       <th>Cost</th>
                   </tr>
               </thead>
               <tbody>
                   <tr>
                       <td>Headshot</td>
                       <td>In Studio</td>
                       <td>0</td>
                       <td>$80</td>
                   </tr>
                   <tr>
                       <td>On-Location Photoshoot</td>
                       <td>5*</td>
                       <td>4*</td>
                       <td>$120</td>
                   </tr>
                   <tr>
                       <td>Studio Photoshoot</td>
                       <td>Studio</td>
                       <td>4*</td>
                       <td>$150</td>
                   </tr>
               </tbody>
           </Table>
           </Container>
           <p><strong>*Disclaimer: There is a $10 surcharge for each location after 2 locations. There is also a $10 surcharge for each outfit change after 2 outfits.</strong></p>
           
        </div>

    );
}