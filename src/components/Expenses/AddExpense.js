import React, { useRef, useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";

export default function AddExpense() {
  const [expense, setexpense] = useState([]);
  const [edit, setedit] = useState(false);
  const [id, setid] = useState("");

  const categoryvalue = useRef();
  const pricevalue = useRef();
  const desvalue = useRef();

  const editexpense = (price, des, cat, idvalue) => {
    setedit(true);
    setid(idvalue);

    pricevalue.current.value = price;
    desvalue.current.value = des;
    categoryvalue.current.value = cat;
  };
  const submithandler = async (event) => {
    event.preventDefault();

    if (edit) {
      const details = {
        price: pricevalue.current.value,
        des: desvalue.current.value,
        cat: categoryvalue.current.value,
      };
      const response = await axios.put(
        `https://expense-tracker-a7536-default-rtdb.firebaseio.com/expenses/${id}.json`,
        details
      );
      if (response.status === 200) {
        console.log("Expense successfuly Updated");
        setedit(false);
      }
      pricevalue.current.value = "";
      desvalue.current.value = "";
      categoryvalue.current.value = "";
    } else {
      const details = {
        price: pricevalue.current.value,
        des: desvalue.current.value,
        cat: categoryvalue.current.value,
      };
      axios.post(
        "https://expense-tracker-a7536-default-rtdb.firebaseio.com/expenses.json",
        details
      );
      setexpense([...expense, details]);
      pricevalue.current.value = "";
      desvalue.current.value = "";
      categoryvalue.current.value = "";
    }
  };
  const deleteexpense = async (id) => {
    setid(id);
    const respose = await axios.delete(
      `https://expense-tracker-a7536-default-rtdb.firebaseio.com/expenses/${id}.json`
    );
    if (respose.status === 200) {
      console.log("SUCCESSFULLY DELETE EXPENSE");
    }
  };
  useEffect(() => {
    async function myfun() {
      const data = await axios.get(
        "https://expense-tracker-a7536-default-rtdb.firebaseio.com/expenses.json?print=pretty"
      );
      const respose = data.data;

      const trasformData = [];
      for (const key in respose) {
        trasformData.push({
          id: key,
          price: respose[key].price,
          des: respose[key].des,
          cat: respose[key].cat,
        });
      }
      setexpense(trasformData);
    }
    myfun();
  }, [submithandler, deleteexpense]);

  return (
    <form onSubmit={submithandler}>
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Add Expense
                </p>
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-hand-holding-usd" />
                  &nbsp;
                  <MDBInput
                    label="Price"
                    id="form2"
                    type="Number"
                    ref={pricevalue}
                    required
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <i className="fas fa-info" />
                  &nbsp;&nbsp;&nbsp;
                  <MDBInput
                    label="Description"
                    id="form3"
                    type="text"
                    ref={desvalue}
                  />
                </div>
                <div>
                  <label>Category : </label>&nbsp;
                  <select id="category" ref={categoryvalue}>
                    <option value="Food">Food</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Movie">Movie</option>
                    <option value="Travel">Travel</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <br />

                <MDBBtn className="mb-4" size="lg" type="submit">
                  {edit ? "update" : "Add Expense"}
                </MDBBtn>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <table class="table">
                  {expense.length === 0 && (
                    <h3 className="text-center my-2">
                      No Expense Found Please Add
                    </h3>
                  )}
                  <thead class="table-dark">
                    <tr>
                      <th scope="col">Price</th>
                      <th scope="col">Descrpition</th>
                      <th scope="col">Category</th>
                      <th scope="col">edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {expense.map((item) => (
                      <tr>
                        <td>{item.price}</td>
                        <td>{item.des}</td>
                        <td>{item.cat}</td>
                        <td>
                          {
                            <i
                              className="fas fa-pen"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                editexpense(
                                  item.price,
                                  item.des,
                                  item.cat,
                                  item.id
                                );
                              }}
                            />
                          }
                        </td>
                        <td>
                          {
                            <i
                              className="fas fa-trash"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                deleteexpense(item.id);
                              }}
                            />
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              fluid
            />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
}