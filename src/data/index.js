const SessionData = () => {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous operation with setTimeout
    setTimeout(() => {
      const data = [
        { id: 1, date: "June 26", chat: "What is an API call" },
        { id: 2, date: "June 27", chat: "What is an data base" },
        { id: 3, date: "June 28", chat: "What is an AI" },
      ];
      resolve(data); // Resolving the promise with the sample data
    }, 1000); // 1 second delay
  });
};

export default SessionData;
