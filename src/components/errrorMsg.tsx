export const ErrorMsg = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        paddingBottom: "10%",
      }}
    >
      <img src="/alert.svg" style={{ height: "8vh", paddingBottom: "5%" }} />
      <div>Error Loading Data. Please Refresh the Page.</div>
    </div>
  );
};

export default ErrorMsg;
