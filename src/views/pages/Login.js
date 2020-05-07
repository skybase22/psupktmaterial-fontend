import React from "react";
import { firebase } from '../../firebase/index'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner
} from "reactstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLogin: false,
      dataSoap: {},
      waitLogin: true,
      currentUser: "",
      message: "",
    }
  }


  // componentDidMount = () => {
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       console.log("user login");

  //     } else {
  //       console.log("no login in login");
  //     }
  //   })

  // }

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  goIndex = () => {
    this.props.history.push("/material/index")
  }

//   handleEnter(e) {
//     if (e.key === 13) {
//     this.onSubmit();
//     }
// }

//   handleSubmit(e) {
//     e.preventDefault();
//     console.log("submit");

//     this.onSubmit();
//   }

  onSubmit = async (e) => {
    if (this.state.username === "") {
      alert("Your username are wrong!")
    } else if (this.state.password === "") {
      alert("Your password are wrong!")
    } else if (!(isNaN(this.state.username))) {
      alert("Your PSU Passport don't have permission")
    } else {
      this.setState({
        waitLogin: false
      })
      var numbers = /^[0-9]+$/;
      if (!(numbers.test(this.state.username))) {
        await axios({
          method: 'post',
          url: 'https://psum.herokuapp.com/api',
          headers: {},
          data: {
            "username": this.state.username,
            "password": this.state.password
          }
        }).then(res => {
          var userEmail = this.state.username + '@email.com'
          const data = res.data
          if (data === "wrong user or password") {
            this.setState({
              waitLogin: true
            })
            alert("Your username or password are wrong!")
          } else {

            firebase.auth()
              .signInWithEmailAndPassword(userEmail, this.state.password)
              .then(() => {

                this.setState({ dataSoap: data });
                localStorage.setItem('name', this.state.dataSoap.username)

                var toPage = localStorage.getItem("from_page")
                var toId = localStorage.getItem("from_id")

                if (toPage !== null) {
                  if (toId !== null) {
                    this.props.history.push(toPage + "?id=" + toId)
                  } else {
                    this.props.history.push(toPage)
                  }
                } else {
                  this.props.history.push("/material/index")
                }
              })
              .catch(error => {
                console.log("this message error", error)
              })
          }
        }).catch(error => {
          this.setState({
            waitLogin: true
          })
          console.log((error));
          alert("Password wrong")
        });
      } else {
        this.setState({
          waitLogin: true
        })
        alert("You don't have permission!")
      }
    }



    // let database = firebase.database().ref("Addmin");
    //     database.once('value', async (snapshot) => {
    //                 if(this.state.username === snapshot.val().username && this.state.password === snapshot.val().password){
    //                     localStorage.setItem('isLogin', snapshot.val().hashpassword); 
    //                     this.props.history.push('/')            
    //                 }        
    //     })
  }

  render() {
    return (
      <>
        <Col className="mt--7" lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with PSU Passport</small>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Username" value={this.state.username} name="username" onChange={
                      (e) => {
                        this.setState({ username: e.target.value })
                      }
                    } type="email" autoComplete="new-email" />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" value={this.state.password} name="password" onKeyDown={this.handleEnter} onChange={
                      (e) => {
                        this.setState({ password: e.target.value })
                      }
                    } type="password" autoComplete="new-password" />
                  </InputGroup>
                </FormGroup>
                  <div className="text-center">
                    <Button style={{ minHeight: "50px", minWidth: "90px" }} className="my-4" color="primary" type="button" onClick={(e) => {
                      this.onSubmit()
                    }} >
                      {this.state.waitLogin ? (
                        <>
                          Sign in
                      </>
                      ) : (
                          <Spinner style={{ padding: "10px", height: "10px", width: "10px" }} color="light" />
                        )}
                    </Button>
                  </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default Login;
