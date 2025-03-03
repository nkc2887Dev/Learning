import { useSocket } from "@/utils/socketContext";

const LiveScore = () => {
  const { score } = useSocket();

  return (
    <div>
      <h2>Live Cricket Score</h2>
      {score ? <p>{score}</p> : <p>Waiting for live updates...</p>}
    </div>
  );
};

export default LiveScore;
