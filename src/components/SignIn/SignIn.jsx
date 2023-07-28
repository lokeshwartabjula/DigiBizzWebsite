import React, { lazy, Component } from "react";
const SignInForm = lazy(() => import("./SignInForm"));
import bcrypt from "bcryptjs";
import { withRouter } from "react-router-dom";

class SignInView extends Component {
    onSubmit = async (values) => {
        const storedUsersMap = localStorage.getItem("usersMap");
    
        if (storedUsersMap) {
          const usersMap = new Map(JSON.parse(storedUsersMap));
          const user = usersMap.get(values.mobileNo);
    
          if (user) {
            const passwordMatch = await bcrypt.compare(values.password, user.password);
            if (passwordMatch) {
              alert("Sign In successful!");
              localStorage.setItem("userAuthenticated", true);
              window.location.href = "/home";

              
            } else {
              alert("Invalid credentials. Please try again.");
            }
          } else {
            alert("User not found. Please sign up first.");
          }
        } else {
          alert("No registered users found. Please sign up first.");
        }
      };
  render() {
    return (
      <div className="container my-3">
        <div className="row border">
          <div className="col-md-3 p-3"></div>
          <div className="col-md-6 p-3">
            <h4 className="text-center">Sign In</h4>
            <SignInForm onSubmit={this.onSubmit} />
          </div>
          <div className="col-md-3 p-3"></div>
        </div>
      </div>
    );
  }
}

export default SignInView;
