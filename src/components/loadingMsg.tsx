interface loadingMsgProps {
  loadingMsgPaddingBottom: string;
  loadingMsgHeight: string;
  loadingMsgWidth: string;
}

export const LoadingMsg = ({
  loadingMsgPaddingBottom,
  loadingMsgHeight,
  loadingMsgWidth,
}: loadingMsgProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        // height: loadingMsgHeight,
        // width: loadingMsgWidth,
        paddingBottom: loadingMsgPaddingBottom,
        color: "black",
      }}
    >
      <img
        src="/loadingAnimation.svg"
        style={{ height: loadingMsgHeight, width: loadingMsgWidth }}
      />
      <div>Loading...</div>
    </div>
  );
};

export default LoadingMsg;
