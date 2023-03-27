import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ShopProduct from "./ShopProduct";
import ShopOrder from "./ShopOrder";
//
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StoreIcon from "@mui/icons-material/Store";
import ShopProductCart from "./ShopProductCart";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function UsersShop() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="page">
            <div>
                <div className="container">
                    <h1>Shop management</h1>
                </div>
            </div>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
                        <Tab icon={<StoreIcon />} iconPosition="start" label="Product" {...a11yProps(0)} />
                        <Tab icon={<ShoppingBagIcon />} iconPosition="start" label="Cart" {...a11yProps(0)} />
                        <Tab icon={<AssignmentIcon />} iconPosition="start" label="Order" {...a11yProps(1)} />
                        
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ShopProduct />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ShopProductCart />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ShopOrder />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    null 2
                </TabPanel>
            </Box>
        </div>
    );
}
