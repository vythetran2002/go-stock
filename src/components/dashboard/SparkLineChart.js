import React from "react";

const LineChart = ({ data = [], width, height }) => {
  const stroke = 1;
  const chartHeight = height - stroke * 2;

  const calculateShape = () => {
    if (!data.length) {
      return `M 0 ${stroke} L 0 ${stroke} L ${width} ${stroke}`;
    }

    const average = data.reduce((acc, val) => acc + val, 0) / data.length;
    const normalizedData = data.map((item) => item - average);
    const highestPoint = Math.max(...normalizedData);

    const coordinates = normalizedData.map((item, index) => ({
      x: (index / (data.length - 1)) * width + stroke,
      y: chartHeight / 2 - (item / highestPoint) * (chartHeight / 2) + stroke,
    }));

    const path = coordinates
      .map((point) => `L ${point.x} ${point.y}`)
      .join(" ");
    return `M ${coordinates[0].x} ${coordinates[0].y} ${path}`;
  };

  const shape = calculateShape();
  const fillEndPath = `V ${height} L 4 ${height} Z`;

  return (
    <svg
      className="stroke-teal-500"
      width={width}
      height={height}
      strokeWidth={stroke}
    >
      <path d={shape} fill="none" />
      <path
        d={`${shape} ${fillEndPath}`}
        stroke="none"
        className="fill-teal-600 opacity-10"
      />
    </svg>
  );
};

export default LineChart;
