import React, {  useState, useEffect } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams} from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

function ResetPassword({match}) {
    const navigate = useNavigate();
    const {token} = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
  
    const { error, success, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("password", password);
      myForm.set("confirmPassword", confirmPassword);
  
      dispatch(resetPassword(token, myForm));
    };
  
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Password Updated Successfully");
  
       navigate("/login");
      }
    }, [dispatch, error, alert, success]);
  
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Helmet>
        <title>RESET PASSWORD</title>
        <meta name="description" content="Description for Home Page"/>
      </Helmet>
            <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Update Profile</h2>
  
                <form
                  className="resetPasswordForm"
                  onSubmit={resetPasswordSubmit}
                >
                  <div>
                    <LockOpenIcon />
                    <input
                      type="password"
                      placeholder="New Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="loginPassword">
                    <LockIcon />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="resetPasswordBtn"
                  />
                </form>
              </div>
            </div>
          </>
        )}
      </>
    );
}

export default ResetPassword
