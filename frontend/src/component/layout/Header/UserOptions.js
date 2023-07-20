import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  tooltip: {
    marginTop: "-.01rem",
    fontSize: "1.5rem"
  }
}));

function UserOptions({user}) {
  const classes = useStyles();
    const { cartItems } = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
  
    const options = [
      { icon: <ListAltIcon  />, name: "Orders", func: orders },
      { icon: <PersonIcon />, name: "Profile", func: account },
      {
        icon: (
          <ShoppingCartIcon
            style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
          />
        ),
        name: `Cart(${cartItems.length})`,
        func: cart,
      },
      { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ];
  
    if (user.role === "admin") {
      options.unshift({
        icon: <DashboardIcon />,
        name: "Dashboard",
        func: dashboard,
      });
    }
  
    function dashboard() {
     navigate("/admin/dashboard");
    }
  
    function orders() {
      navigate("/orders");
    }
    function account() {
      navigate("/account");
    }
    function cart() {
      navigate("/cart");
    }
    function logoutUser() {
      navigate("/")
      dispatch(logout());
      alert.success("Logged out Successfully");
    }
  
    return (
      <>
      
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          style={{ zIndex: "11"}}
          open={open}
          direction="down"
          className="speedDial"
          icon={
            <img
              className="speedDialIcon"
              src={"/Profile.png"}
              alt="Profile"
            />
          }
        >
          {options.map((item) => (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.func}
              tooltipOpen={window.innerWidth <= 600 ? true : false}
              TooltipClasses={classes}
            />
          ))}
        </SpeedDial>
      </>
    );
}

export default UserOptions;
