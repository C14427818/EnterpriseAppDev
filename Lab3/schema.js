/**
 * Created by ORuairc on 01/03/2018.
 */

export default `
  type Query {
    hi: String
    
   }
  
  
`;

//NOT WORKING**
/*type Query {
 getProductandCustomer {
 productByProdId(prodId: 200) {
 title
 actor
 price
 custHistsByProdId {
 nodes {
 orderid
 customerid
 }
 }
 }
 }

 getCustomerAndOrderandCustomerHists {
 customerByCustomerid(customerid: 17564) {
 firstname
 lastname
 ordersByCustomerid {
 nodes {
 orderid
 orderdate
 custHistsByOrderid {
 nodes {
 prodID
 }
 }
 }
 }
 }
 }

}

type mutation{
 createNewOrder($orderTest: CreateOrderInput!) {
 createOrder(input: $orderTest) {
 orderEdge {
 node {
 orderid
 orderdate
 customerid
 netamount
 tax
 totalamount
 orderlinesByOrderid {
 nodes {
 orderid
 }
 }
 custHistsByOrderid {
 nodes {
 customerid
 }
 }
 }
 }
 }
 }
}

*/