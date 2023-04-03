import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Box from "@mui/material/Box";
import UserManagement from "./UserManagement";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import TransactionManagement from "./TransactionManagement";
import Category from "./Category";

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
                    <>{children}</>
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

export default function Admin() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="page">
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
                        <Tab label="User" {...a11yProps(0)} />
                        <Tab label="Product" {...a11yProps(1)} />
                        <Tab label="Category" {...a11yProps(2)} />
                        <Tab label="Order" {...a11yProps(3)} />
                        <Tab label="Transaction" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <UserManagement />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ProductManagement/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Category/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <OrderManagement/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <TransactionManagement/>
                </TabPanel>
            </Box>
        </div>
    );
}

