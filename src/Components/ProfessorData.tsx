import { useEffect, useState } from "react";

const sheetURL = "https://script.google.com/macros/s/AKfycbxK3IvHMif1944AfiR-Gm6-UPGPcQDBC9dDbjThjdmqBiyptOBv32OME9RR-lnq-Qn1/exec"; 


const fetchData = async (): Promise<FormData[]> => {
  try {
    const response = await fetch(sheetURL);
    const data = await response.json();
    
    console.log("Raw Data from API:", data); // Check full API response in console

    if (!Array.isArray(data) || data.length < 2) {
      console.error("Unexpected data format or empty response.");
      return [];
    }

    return data.slice(1).map((row: string[], index: number) => {
      console.log(`Row ${index}:`, row); // Log each row to debug indexes

      return {
        name: row[11] || "N/A", // Ensure index exists, else use fallback
        rating: row[13] || "N/A",
      };
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};



interface FormData {
    name: string;
    rating: string;
}

const ProfessorData = () => {
  const [responses, setResponses] = useState<FormData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setResponses(data);

      if (data.length === 0) {
        setError("No data found or incorrect indexes.");
      }
    };

    loadData();
  }, []);

  return (
    <div className="container">
      <h2>Form Responses</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index}>
              <td>{response.name}</td>
              <td>{response.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfessorData;