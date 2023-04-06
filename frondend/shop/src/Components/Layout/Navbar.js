import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// 



//
function Navbar(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState({});

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
    };

    const loadDataUser = () => {
        if (localStorage.getItem("token") !== null) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            fetch("/user/auth/info", requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.status);
                })
                .then((result) => {
                    // console.log(result);
                    setUser(result);
                })
                .catch((error) => {
                    console.log("error", error);
                    handleLogout();
                });
        }
    };

    React.useEffect(() => {
        loadDataUser();
    }, []);
    return (
        <AppBar position="static" className="navbar p-0 ">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Toàn màn hình */}
                    <HomeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                        }}
                    >
                        <Link to={"/"}>Home</Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {/* Các page */}
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link to={"/product"}>Product</Link>
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    {/* Màn hình hẹp */}
                    <HomeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontWeight: 700,
                        }}
                    >
                        <Link to={"/"}>Home</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {/* Các page */}
                        <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "white", display: "block" }}>
                            <Link to={"/product"}>Product</Link>
                        </Button>
                    </Box>
                    {/* fff */}
                    <Box sx={{ flexGrow: 0 }}>
                        {localStorage.getItem("token") === null ? (
                            <>
                                <Typography className="btn btn-outline-light btn-rounded">
                                    <Link to={"singin"}>Đăng nhập</Link>
                                </Typography>
                            </>
                        ) : (
                            <>
                                <>
                                    <Tooltip title={user.firstName + " " + user.lastName} style={{ background: "#fff" }}>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="" src={user.photos} />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                        className="menu-setting"
                                    >
                                        {/* "Profile", "Account", "Dashboard", "Logout" */}
                                        <Link to={"/profile"}>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">Account</Typography>
                                            </MenuItem>
                                        </Link>
                                        <Link to={"/dashboard"}>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">Dashboard</Typography>
                                            </MenuItem>
                                        </Link>
                                        <Link to={"/tabs"}>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">Tabs</Typography>
                                            </MenuItem>
                                        </Link>
                                        <Link to={"/test"}>
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">Test</Typography>
                                            </MenuItem>
                                        </Link>
                                        <hr />
                                        {user.role === "ADMIN" ? (
                                            <Link to={"/admin"}>
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center">Admin</Typography>
                                                </MenuItem>
                                            </Link>
                                        ) : null}

                                        <hr />
                                        <Link to={"/"} >
                                        
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center" onClick={handleLogout}>
                                                Logout
                                            </Typography>
                                        </MenuItem>
                                        </Link>
                                    </Menu>
                                    <Tooltip title={"Shopping Cart"}>
                                        <Link to={"/carts"}>
                                            <IconButton sx={{ p: 0, width: "50px" }}>
                                                <ShoppingCartIcon style={{ color: "white", fontSize: "30px" }} />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>
                                </>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
            
        </AppBar>
    );
}
export default Navbar;