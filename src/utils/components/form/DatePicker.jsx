//

export default function DatePicker({ handleChange, formData }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  // Function to generate an array of numbers from 1 to n
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Year options (adjust the range as needed)
  const yearOptions = range(
    new Date().getFullYear() - 100,
    new Date().getFullYear()
  ).reverse();

  return (
    <>
      <select
        name="year"
        value={formData.dob.year}
        onChange={(e) =>
          handleChange({
            target: {
              name: "dob",
              value: { ...formData.dob, year: e.target.value },
            },
          })
        }
        required
      >
        <option value="">Year</option>
        {/* Generate options for years */}
        {yearOptions.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        name="month"
        value={formData.dob.month}
        onChange={(e) => {
          const monthValue = e.target.value;
          const yearValue = formData.dob.year;
          const daysInMonth =
            monthValue && yearValue
              ? getDaysInMonth(yearValue, monthValue)
              : 31; // Default to 31 days if month or year is not selected

          handleChange({
            target: {
              name: "dob",
              value: {
                ...formData.dob,
                month: monthValue,
                day: formData.dob.day > daysInMonth ? "" : formData.dob.day,
              }, // Reset day if it exceeds the number of days in the selected month
            },
          });
        }}
        required
      >
        <option value="">Month</option>
        {/* Generate options for months */}
        {monthNames.map((month, index) => (
          <option key={index + 1} value={index + 1}>
            {month}
          </option>
        ))}
      </select>

      <select
        name="day"
        value={formData.dob.day}
        onChange={(e) =>
          handleChange({
            target: {
              name: "dob",
              value: { ...formData.dob, day: e.target.value },
            },
          })
        }
        required
      >
        <option value="">Day</option>
        {/* Generate options for days based on the selected month and year */}
        {range(1, getDaysInMonth(formData.dob.year, formData.dob.month)).map(
          (day) => (
            <option key={day} value={day}>
              {day}
            </option>
          )
        )}
      </select>
    </>
  );
}
