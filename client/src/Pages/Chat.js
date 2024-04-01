import Layout from "../components/Layout";
import React from "react";
import Chatbot from "react-simple-chatbot";
import { Segment } from "semantic-ui-react";

const Chat = () => {
  const steps = [
    {
      id: "Greet",
      message: "Welcome to CarePlus",
      trigger: "next",
    },
    {
      id: "next",
      message: "How can I help You?",
      trigger: "options",
    },
    {
      id: "options",
      options: [
        {
            value:'website',//unique identifiers (it is like a key)( in this case key=1)
          label: "Tell me about the website",
          trigger: "website",
        },
        // {
        //     value:'company',//(in this case key=2)
        //   label: "Tell me about the company",
        //   trigger: "companyinfo",
        // },
        {
            value:'end',
          label: "Thank you",
          trigger: "end",
        },
      ],
    },
    {
      id: "website",
      message: "CarePlus offers a comprehensive platform for patients to book appointments with available doctors and for aspiring medical professionals to apply for positions.\n\t Regular users has benefits of applying for their desired doctor, emergency phone services and AI-driven chat support.\n\t Doctors enjoy elevated privileges, including appointment review and management capabilities.",
     end:true
    },
    {
      id: "companyinfo",
      message: "Information about the company",
      end:true
    },
    {
      id: "end",
      message: "Thank you and have a nice day.",
      end:true
    },
  ];

  return (
    <Layout>
      <Segment style={{ float: 'right' }}>
        <Chatbot steps={steps}
          bubbleStyle={{
            backgroundColor: '#3066BE',
            color: '#fff',
          }}
        />
      </Segment>
    </Layout>
  );
};

export default Chat;
