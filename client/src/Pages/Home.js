import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Doctor from "../components/Doctor";
import { useDispatch } from "react-redux";
import{showLoading,hideLoading} from "../redux/alertsSlice"
const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <h1 className="page-title">Available Doctors</h1>
      <hr />
      <Row gutter={20}>
        {doctors.map((doctors) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Doctor doctor={doctors} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default Home;
