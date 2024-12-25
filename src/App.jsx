import React, { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";
import { formatDate } from "./formatDate";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchXMLData = async () => {
      try {
        const response = await fetch(
          "/taposadmin/GENABU/pos_feed/?type=MEDIA2"
        );
        const xmlText = await response.text();

        const parser = new XMLParser();
        const jsonObj = parser.parse(xmlText);

        setData(jsonObj);
      } catch (error) {
        console.error("Error fetching or parsing XML:", error);
      }
    };

    fetchXMLData();
  }, []);

  console.log(data);

  return (
    <div className="max-w-7xl p-8 mx-auto">
      <h1 className="text-white capitalize text-4xl">Genesis API Test</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="grid grid-cols-1 mt-5 divide-y-2">
        {data?.Feed?.Films?.Film &&
          data.Feed.Films.Film.map((movie, i) => (
            <div className="py-4" key={i}>
              <div className="flex gap-4">
                <div className="flex-none w-[200px]">
                  <img
                    src={movie.img_bd}
                    alt={movie.FilmTitle}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col gap-3 justify-between">
                  <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">{movie.FilmTitle}</h1>
                    <p className="font-medium text-lg">{movie.Synopsis}</p>
                    <div className="grid grid-cols-1 gap-2">
                      <p className="font-medium text-lg">
                        <span className="font-semibold">Genre:</span>{" "}
                        {movie.Genre}
                      </p>
                      <p className="font-medium text-lg">
                        <span className="font-semibold">Running Time:</span>{" "}
                        {movie.RunningTime} mins
                      </p>
                      <p className="font-medium text-lg">
                        <span className="font-semibold">Ratings:</span>{" "}
                        {movie.Certificate} ({movie.Certificate_desc})
                      </p>
                      <p className="font-medium text-lg">
                        <span className="font-semibold">Start Date:</span>{" "}
                        {movie.StartDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {data?.Feed.Performances?.Performance &&
                      Object.entries(
                        data.Feed.Performances.Performance.filter(
                          (performance) => performance.FilmCode === movie.Code
                        ).reduce((acc, performance) => {
                          const date = performance.PerformDate;
                          if (!acc[date]) {
                            acc[date] = [];
                          }
                          acc[date].push(performance.StartTime);
                          return acc;
                        }, {})
                      ).map(([date, startTimes], index) => (
                        <div key={index}>
                          <div className="font-semibold mb-2">{formatDate(date)}</div>
                          <div className="flex gap-3">
                            {startTimes.map((startTime, idx) => (
                              <a href={performance.BookingURL} key={idx} className="border border-white p-2 rounded-md mb-3 hover:cursor-pointer hover:bg-white hover:text-black">{startTime}</a>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
