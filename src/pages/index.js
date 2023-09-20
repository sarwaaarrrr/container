import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/runDat", {
        method: "POST",
      });

      if (response.ok) {
        console.log("DAT function executed successfully");
      } else {
        console.error("Error executing DAT function");
      }
    } catch (error) {
      console.error("Error executing DAT function:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Run DAT Function"}
      </button>
    </div>
  );
}
