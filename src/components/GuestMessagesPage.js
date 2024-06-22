// GuestMessagesPage.js
import React, { useEffect, useState } from "react";
import { List } from "antd";
import { fetchGuestData } from "./guestData";
import "./GuestMessagesPage.css";

const GuestMessagesPage = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    const getGuests = async () => {
      const data = await fetchGuestData();
      setGuests(data);
    };

    getGuests();
  }, [guests]);

  return (
    <div className="messages-container">
      <div className="scrolling-text">
        <List
          dataSource={guests}
          renderItem={(item) => (
            <div className="message-item">
              <List.Item>
                <List.Item.Meta
                  title={<span className="message">"{item.message}"</span>}
                  description={
                    <span className="name">
                      ~ {item.name}, {item.asal} ~{" "}
                    </span>
                  }
                />
              </List.Item>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default GuestMessagesPage;
