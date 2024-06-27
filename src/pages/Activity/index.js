import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import SessionData from "./../../data";

const Activity = () => {
  const [sessionDates, setSessionDates] = useState([]);
  const [sessionChatLength, setSessionChatLength] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SessionData();
        console.log("data ", data);
        setSessionDates([...Array.from(data, (data) => data.date)]);
        setSessionChatLength([...Array.from(data, (data) => data.chat.length)]);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <BarChart
        xAxis={[{ scaleType: "band", data: sessionDates }]}
        series={[{ data: sessionChatLength }]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default Activity;
