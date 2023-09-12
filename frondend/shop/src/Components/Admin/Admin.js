
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UsersManagement from "./Users/UsersManagement";
import ProductManagement from "./Products/ProductManagement";
import CategoryManagement from "./Category/CategoryManagement";
import OrderManagement from "./Order/OrderManagement";
import TransactionManagement from "./Transaction/TransactionManagement";
//
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StoreIcon from "@mui/icons-material/Store";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API from "../Api/Api";
//

export default function Admin() {
    let { keyParams } = useParams();
    const [value, setValue] = React.useState("user");

    const navigation = useNavigate();
    const handleChange = (event, newValue) => {
        // setValue(newValue);
        navigation("/admin/" + newValue);
    };
    const loadDataUser = React.useCallback(() => {
        if (localStorage.getItem("token") !== null) {
            axios
                .get(API + "/user/auth/info", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((res) => {
                    if (res.data.role !== "ADMIN") {
                        navigation("/");
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                });
        }
    }, [navigation]);
    React.useEffect(() => {
        if (keyParams !== null) {
            setValue(keyParams)
        };
        if (keyParams === null || keyParams === undefined) {
            setValue("user");
        };
        
        if (localStorage.getItem("token") !== null) {
            loadDataUser();
        }
    }, [loadDataUser, keyParams]);

    return (
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
            <TabContext value={value}>
                <Box sx={{ borderRight: 1, borderColor: "divider" }}>
                    <TabList
                        orientation="vertical"
                        variant="scrollable"
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                    >
                        <Tab
                            label="Người dùng"
                            value="user"
                            className={"text-nowrap"}
                            sx={{ justifyContent: "left" }}
                            icon={<AccountCircleIcon />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Sản phẩm"
                            value="product"
                            className={"text-nowrap"}
                            sx={{ justifyContent: "left" }}
                            icon={<StoreIcon />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Danh mục"
                            value="category"
                            className={"text-nowrap"}
                            sx={{ justifyContent: "left" }}
                            icon={<CategoryIcon />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Đơn hàng"
                            value="order"
                            className={"text-nowrap"}
                            sx={{ justifyContent: "left" }}
                            icon={<AssignmentIcon />}
                            iconPosition="start"
                        />
                        <Tab
                            label="Đơn thanh toán"
                            value="transaction"
                            className={"text-nowrap"}
                            sx={{ justifyContent: "left" }}
                            icon={<ReceiptLongIcon />}
                            iconPosition="start"
                        />
                    </TabList>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <TabPanel value="user">
                        <UsersManagement />
                    </TabPanel>
                    <TabPanel value="product">
                        <ProductManagement />
                    </TabPanel>
                    <TabPanel value="category">
                        <CategoryManagement />
                    </TabPanel>
                    <TabPanel value="order">
                        <OrderManagement />
                    </TabPanel>
                    <TabPanel value="transaction">
                        <TransactionManagement />
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    );
}
