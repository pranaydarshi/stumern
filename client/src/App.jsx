import './App.css';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
// import Deleteuser from './Deleteuser';
// import Adddetials from './Adddetials';
function App() {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")
  const [rollno, setRollno] = useState("")
  const [phno, setPhno] = useState("")
  const [branch, setBranch] = useState("")
  const [form, setform] = useState(false)
  const nameChange = (e) => {
    setName(e.target.value)

  }
  const yearChange = (e) => {
    setYear(e.target.value)

  }
  const rollnoChange = (e) => {
    setRollno(e.target.value)

  }
  const branchChange = (e) => {
    setBranch(e.target.value)
  }
  const phnoChange = (e) => {
    setPhno(e.target.value)

  }
  // const data = {
  //   name: name,
  //   rollno: rollno,
  //   year: year,
  //   phno: phno,
  //   branch: branch

  // }
  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log("submit invoked")
    fetch("http://localhost:2002/addDetails", {
      method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, rollno, year, phno, branch })
    }).then((data) => { console.log(data.status) }).catch((e) => { console.log(e) })

  }
  const openform = () => {
    setform(!form)
  }
  return (

    <>
      <div className="App">
        <center>
          <Getdetials></Getdetials>

          <input type="button" value="Add New Details" onClick={openform} />
          {form ? (

            <><h1>Student Management</h1><form action="" onSubmit={(e) => sumbitHandler(e)}>
              Username: <input type="text" placeholder="Username" value={name} onChange={(e) => nameChange(e)} id='name' /><br />
              RollNo: <input type="text" placeholder="Roll No" value={rollno} onChange={(e) => rollnoChange(e)} id="rollno" /><br />
              Year: <input type="text" placeholder="Year" value={year} onChange={(e) => yearChange(e)} id='year' /><br />
              Branch: <input type="text" placeholder="Branch" value={branch} onChange={(e) => branchChange(e)}></input><br />
              Phno: <input type="number" placeholder="Phno" value={phno} onChange={(e) => phnoChange(e)} id="phno" /><br />
              <input type="submit" value="Submit" />

            </form></>
          ) :
            ""

          }
          <Edituser></Edituser>

        </center>


      </div>
    </>
  );
}
const Getdetials = () => {
  let [studata, setstudata] = useState([])
  // let [stu, setstu] = useState("Hi")

  // console.log(studata)
  async function details() {

    const response = await fetch("http://localhost:2002/getDetails")
    const result = await response.json()


    setstudata(result)

  }
  useEffect(() => {

    details()

  }, [])
  // const editbtn = (e) => {
  //   const id = e.target.name
  //   console.log(id);
  //   return function (id) {
  //     <Edituser id={"name"} />
  //   }
  // }
  let [updateform, setdupdateform] = useState(-1)

  const editbtn = (id) => {
    console.log(id)
    setdupdateform(id)
  }
  return (

    <div>
      <h1>hello</h1>
      {

        studata.map(data =>
        (
          <ul key={data._id}>

            <li >{data.name}


              {/* <Button value="Edit" name={data._id} onClick={(e) => editbtn(e)}>Edit</Button> */}

              {updateform === data._id ? <Edituser val={"data"}></Edituser> :
                (
                  <>
                    <input type="button" value="Edit" name={data._id} onClick={() => editbtn(data._id)} />
                  </>
                )
              }
              <Button variant="waring" name={data._id} onClick={(e) => deleteuser(e)}> Delete</Button>


            </li>
          </ul>
        )
        )
      }

    </div>
  )

}
const Edituser = (props) => {
  const [edit, setedit] = useState("")
  console.log(props)
  return (
    <div>

      <input type="text" name={props} id="" value={props.val} />
      <button >update</button>
    </div>


  )

}

const deleteuser = (e) => {
  let id = e.target.name
  console.log(id)
  fetch(`http://localhost:2002/deleteuser/${id}`, {
    method: 'DELETE'
  }).then(() => {
    console.log("Successfully Deleted")
  })

}
export default App;
