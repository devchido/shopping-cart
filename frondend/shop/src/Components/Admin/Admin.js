import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Profile from "../User/Profile";
import ProductManagement from "./ProductManagement";
// có thể xem để test nav
// Nested List
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className=" w-100"
            {...other}
        >
            {value === index && (
                <div className="p-4 ">
                    <>{children}</>
                </div>
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
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

function Admin() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider", width: "16rem" }}
            >
                <Tab label="Quản lý user" className={"text-nowrap"} {...a11yProps(0)} />
                <Tab label="Quản lý product" className={"text-nowrap"} {...a11yProps(1)} />
                <Tab label="Quản lý Order" className={"text-nowrap"} {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                Quản lý user
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProductManagement />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
        </Box>
    );
}

export default Admin;
