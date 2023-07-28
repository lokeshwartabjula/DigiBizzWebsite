import React, { lazy, Component } from "react";
import bcrypt from "bcryptjs";

const SingUpForm = lazy(() => import("./SignUpForm"));

class SignUpView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersMap: new Map(),
    };
  }

  onSubmit = async (values) => {
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(values.password, salt);

    // Create the user object with the hashed password
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      mobileNo: values.mobileNo,
      password: hashedPassword,
    };

    // Save the user object to the usersMap
    const usersMap = this.state.usersMap;
    usersMap.set(values.mobileNo, user);

    // Serialize the usersMap to JSON and save it in local storage
    localStorage.setItem("usersMap", JSON.stringify(Array.from(usersMap)));


    // Update the state with the new usersMap
    this.setState({ usersMap });

    // Alert to indicate successful registration
    alert("Registration successful!");
  };
  render() {
    return (
      <div className="container my-3">
        <div className="row border">
          <div className="col-md-3 p-3"></div>
          <div className="col-md-6 p-3">
            <h4 className="text-center">Sign Up</h4>
            <SingUpForm onSubmit={this.onSubmit} />
          </div>
          <div className="col-md-3 p-3"></div>
        </div>
      </div>
    );
  }
}

export default SignUpView;
