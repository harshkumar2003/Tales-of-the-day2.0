import React, { useState } from "react";
import html2canvas from "html2canvas";
import TaleCard from "./TaleCard";

const ExportImage = () => {
  const [showCard, setShowCard] = useState(false);

  const handleDownload = () => {
    const element = document.getElementById("download-section");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "tale-card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <button
        onClick={() => setShowCard(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Create Card
      </button>

      {showCard && (
        <>
          <div id="download-section" className="mb-4">
            <TaleCard
              title="The Tale of Perseverance"
              content="Once upon a time in the land of code..."
              date="July 23, 2025"
            />
          </div>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download Image
          </button>
        </>
      )}
    </div>
  );
};

export default ExportImage;
