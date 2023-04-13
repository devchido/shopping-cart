import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Profile from "../User/Profile";
import ProductManagement from "./Products/ProductManagement";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UsersManagement from "./Users/UsersManagement";
import CategoryManagement from "./Category/CategoryManagement";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import OrderManagement from "./Order/OrderManagement";
import TransactionManagement from "./Transaction/TransactionManagement";
import StoreIcon from "@mui/icons-material/Store";
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
                className="text-left col-3"
                sx={{ borderRight: 1, borderColor: "divider", width: "12rem", justifyContent: "left" }}
            >
                <Tab
                    label="user"
                    className={"text-nowrap"}
                    sx={{ justifyContent: "left" }}
                    {...a11yProps(0)}
                    icon={<AccountCircleIcon />}
                    iconPosition="start"
                />
                <Tab
                    label="product"
                    className={"text-nowrap"}
                    sx={{ justifyContent: "left" }}
                    {...a11yProps(1)}
                    icon={<StoreIcon />}
                    iconPosition="start"
                />
                <Tab
                    label="category"
                    className={"text-nowrap"}
                    sx={{ justifyContent: "left" }}
                    {...a11yProps(2)}
                    icon={<CategoryIcon />}
                    iconPosition="start"
                />
                <Tab
                    label="Order"
                    className={"text-nowrap"}
                    sx={{ justifyContent: "left" }}
                    {...a11yProps(3)}
                    icon={<AssignmentIcon />}
                    iconPosition="start"
                />
                <Tab
                    label="Transaction"
                    className={"text-nowrap"}
                    sx={{ justifyContent: "left" }}
                    {...a11yProps(4)}
                    icon={<ReceiptLongIcon />}
                    iconPosition="start"
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <UsersManagement />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProductManagement />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CategoryManagement />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <OrderManagement />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TransactionManagement />
            </TabPanel>
        </Box>
    );
}

export default Admin;
