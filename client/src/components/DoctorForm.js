import React, { useState } from "react";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";

const DoctorForm = ({ onFinish, initialValues }) => {
  const defaultInitialValues = initialValues || {};

  const handleTimingsChange = (value) => {
    // Since value is an array of moment objects, we convert them to strings
    const formattedValues = value.map(time => time.format("HH:mm"));
    // We update the form values directly using setFieldsValue
    form.setFieldsValue({ timings: formattedValues });
  };

  const [form] = Form.useForm(); // Creating a form instance to use form methods



  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...defaultInitialValues,
        timings: defaultInitialValues.timings
          ? [
              moment(defaultInitialValues?.timings[0], "HH:mm"),
              moment(defaultInitialValues?.timings[1], "HH:mm"),
            ]
          : undefined,

        // ...initialValues,
        // timings:[
        //   moment(initialValues.timings[0],'HH:mm'),
        //   moment(initialValues.timings[1],'HHz:mm')
        // ]
      }}
    >
      <h1 className="card-title mt-3 text-dark">Personal Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item 
          id="label"
            required
            label="First Name"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Last Name"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Phone"
            name="phone"
            rules={[{ required: true }]}
          >
            <Input type="number"></Input>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item label="Website" name="website" rules={[{ require: true }]}>
            <Input></Input>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Address"
            name="address"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Professional Information</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Specialization"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Experience"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input type="number"></Input>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Fee per Consultation"
            name="feePerConsultation"
            rules={[{ required: true }]}
          >
            <Input type="number"></Input>
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Timings"
            name="timings"
            rules={[
              {
                required: true,
                type: "array",
                message: "Please select timings!",
              },
            ]}
          >
            <TimePicker.RangePicker
              onChange={handleTimingsChange}
              format="HH:mm"
            />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}></Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Button className="primary-button" id="submit" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default DoctorForm;
