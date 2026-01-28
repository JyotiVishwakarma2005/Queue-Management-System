import TokenCard from "./Components/TokenCard";

const TokenCategory = ({ title }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      <div className="space-y-4">
        <TokenCard 
          id="ADM001"
          name="Rahul Sharma"
          roll="2024001"
          course="B.Tech CSE"
          date="2024-01-15"
          time="10:30 AM"
          status="Pending"
        />

        <TokenCard 
          id="ADM002"
          name="Priya Patel"
          roll="2024002"
          course="B.Tech ECE"
          date="2024-01-15"
          time="11:00 AM"
          status="Processing"
        />
      </div>
    </div>
  );
};

export default TokenCategory;
