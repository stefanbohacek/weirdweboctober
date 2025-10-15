import ready from "../../shared/js/ready.js";

ready(async () => {
  const data = [
    { year: 1991, count: 7094 },
    { year: 1992, count: 28292 },
    { year: 1993, count: 34168 },
    { year: 1996, count: 38885 },
    { year: 1998, count: 38887 },
    { year: 1999, count: 49194 },
    { year: 2001, count: 94140 },
    { year: 2002, count: 95156 },
    { year: 2003, count: 96382 },
    { year: 2005, count: 97655 },
    { year: 2006, count: 99024 },
    { year: 2008, count: 100648 },
    { year: 2009, count: 107296 },
    { year: 2010, count: 109384 },
    { year: 2012, count: 110116 },
    { year: 2012, count: 110117 },
    { year: 2013, count: 110122 },
    { year: 2014, count: 112956 },
    { year: 2015, count: 120672 },
    { year: 2016, count: 128172 },
    { year: 2017, count: 136690 },
    { year: 2018, count: 137374 },
    { year: 2019, count: 137928 },
    { year: 2019, count: 137929 },
    { year: 2020, count: 143859 },
    { year: 2021, count: 144697 },
    { year: 2022, count: 149186 },
    { year: 2023, count: 149813 },
    { year: 2024, count: 154998 },
    { year: 2025, count: 159801 },
  ];

  new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Number of Unicode characters",
          data: data.map((row) => row.count),
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "category",
        },
      },
    },
  });
});
