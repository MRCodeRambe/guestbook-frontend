import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Menu, Form, Input, Button, List } from "antd";
import "./GuestBook.css";
import { PlayCircleOutlined } from "@ant-design/icons"; // Jika Anda menggunakan Ant Design Icons
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const GuestBook = () => {
  const [guests, setGuests] = useState([]);
  const [form] = Form.useForm();

  const [name, setName] = useState("");
  const [asal, setAsal] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchGuests();
  }, [guests]);

  const fetchGuests = async () => {
    try {
      const response = await axios.get("/api/guests");
      setGuests(response.data);
    } catch (error) {
      console.error("There was an error fetching the guests!", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/guests", { name, asal, message });
      setGuests([...guests, response.data]);
      form.resetFields(); // Reset form fields setelah submit
      setName("");
      setAsal("");
      setMessage("");
    } catch (error) {
      console.error("There was an error saving the guest!", error);
    }
    console.log("tes");
  };

  return (
    <Layout className="layout">
      <Header className="header-div">
        <div className="logo" />
        <h3 className="header-title">Guest Book</h3>
      </Header>
      <Content style={{ padding: "1rem 50px" }} className="content-div">
        <div className="site-layout-content" style={{ marginTop: "20px" }}>
          <Form
            form={form}
            name="guestbook"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <div>
              <h3>Nama</h3>
              <Form.Item
                label=""
                name="name"
                rules={[
                  { required: true, message: "Silahkan masukkan nama Anda!" },
                ]}
                className="customFormItem customFormItem-adj"
              >
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>
            </div>
            <div>
              <h3>Asal Perusahaan / Instansi/ Daerah</h3>
              <Form.Item
                label=""
                name="asal"
                rules={[
                  { required: true, message: "Silahkan masukkan asal Anda!" },
                ]}
                className="customFormItem"
              >
                <Input value={asal} onChange={(e) => setAsal(e.target.value)} />
              </Form.Item>
            </div>
            <div>
              <h3>Message</h3>
              <Form.Item
                label=""
                name="message"
                rules={[
                  { required: true, message: "Silahkan masukkan pesan Anda!" },
                ]}
              >
                <Input.TextArea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Kirim
              </Button>
            </Form.Item>
          </Form>
          <List
            header={
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                Guests Messages
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link to="/play">
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        // Tambahkan logika pemutaran audio di sini
                        console.log("Play button clicked");
                      }}
                    >
                      <PlayCircleOutlined
                        style={{
                          fontSize: "2rem",
                          color: "white",
                          marginRight: "0.5rem",
                        }}
                      />
                      <span style={{ color: "white", fontSize: "1.5rem" }}>
                        Play
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            }
            bordered
            dataSource={guests}
            renderItem={(item) => (
              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                <div style={{ marginBottom: "2rem" }}>
                  <List.Item>
                    <List.Item.Meta
                      title={<span className="name">" {item.message} "</span>}
                      description={
                        <span className="message">
                          ~ {item.name}, {item.asal} ~{" "}
                        </span>
                      }
                    />
                  </List.Item>
                </div>
              </div>
            )}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }} className="footer-div">
        Guestbook ©2023
      </Footer>
    </Layout>
  );
};

export default GuestBook;
