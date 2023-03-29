export const LoadingMsg = () => {
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
        color: "black",
      }}
    >
      <img src="/loadingAnimation.svg" />
      <div>Loading...</div>
    </div>
  );
};

export default LoadingMsg;
