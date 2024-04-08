//

export default function DatePicker({
  handleChange,
  formData,
  name = "dob",
  yearOnly = false,
}) {
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
        className="input-field"
        name="year"
        value={formData[name].year}
        onChange={(e) =>
          handleChange({
            target: {
              name: name,
              value: { ...formData[name], year: e.target.value },
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

      {yearOnly ? null : (
        <>
          <select
            className="input-field"
            name="month"
            value={formData[name].month}
            onChange={(e) => {
              const monthValue = e.target.value;
              const yearValue = formData[name].year;
              const daysInMonth =
                monthValue && yearValue
                  ? getDaysInMonth(yearValue, monthValue)
                  : 31; // Default to 31 days if month or year is not selected

              handleChange({
                target: {
                  name: name,
                  value: {
                    ...formData[name],
                    month: monthValue,
                    day:
                      formData[name].day > daysInMonth
                        ? ""
                        : formData[name].day,
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
            className="input-field"
            name="day"
            value={formData[name].day}
            onChange={(e) =>
              handleChange({
                target: {
                  name: name,
                  value: { ...formData[name], day: e.target.value },
                },
              })
            }
            required
          >
            <option value="">Day</option>
            {/* Generate options for days based on the selected month and year */}
            {range(
              1,
              getDaysInMonth(formData[name].year, formData[name].month)
            ).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  );
}
