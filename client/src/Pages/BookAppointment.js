import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import axios from "axios";
// import moment from "moment";
import { toast } from "react-hot-toast";

const BookAppointment = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const { user } = useSelector((state) => state.user);

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        "/api/user/check-booking-availability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error Booking Appointment");
      dispatch(hideLoading());
    }
  };

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());

      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        navigate('/appointments')
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error Booking Appointment");
      dispatch(hideLoading());
    }
  };

  //   console.log("Date????",date)
  //   console.log(time)

  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row gutter={50} className="mt-5 px-4">
          {/* <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRw_opYtcaBtC3KIdwaGbjTzWRkc-q9fbt9A&usqp=CAU"
                alt=""
                height="auto"
                width="400"
              />
            </Col> */}
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings: </b>
                {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <p>
                <b>Specialization: </b>
                {doctor.specialization}
              </p>
              <p>
                <b>Experience: </b>
                {doctor.experience}
              </p>
              <p>
                <b>Phone Number: </b>
                {doctor.phone}
              </p>
              <p>
                <b>Address: </b>
                {doctor.address}
              </p>
              <p>
                <b>Fee per Visit: </b>
                {doctor.feePerConsultation}
              </p>

              <div className="d-flex flex-column pt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) => {
                    setIsAvailable(false);
                    //   console.log(value);
                    setDate(value.format("DD-MM-YYYY"));
                  }}
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setIsAvailable(false);
                    //   console.log(value);
                    setTime(value.format("HH:mm"));
                  }}
                />
                {!isAvailable && (<Button
                  className="primary-button mt-3 full-width-button"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button>)}
                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
            </Col>
            
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default BookAppointment;
