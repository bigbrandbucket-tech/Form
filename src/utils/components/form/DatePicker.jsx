//

export function TimePicker({ handleChange, formData, name = "time" }) {
  // Function to generate an array of numbers from start to end
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Hour options
  const hourOptions = range(0, 23);

  // Minute options
  const minuteOptions = range(0, 59);

  const timezones = Intl.supportedValuesOf("timeZone");

  return (
    <>
      <select
        className="input-field custom:w-1/3"
        name="hour"
        value={formData[name]?.hour}
        onChange={(e) =>
          handleChange({
            target: {
              name: name,
              value: { ...formData[name], hour: e.target.value },
            },
          })
        }
        required
      >
        <option value="">Hour</option>
        {/* Generate options for hours */}
        {hourOptions.map((hour) => (
          <option key={hour} value={hour}>
            {hour < 10 ? `0${hour}` : hour}
          </option>
        ))}
      </select>

      <select
        className="input-field custom:w-1/3"
        name="minute"
        value={formData[name]?.minute}
        onChange={(e) =>
          handleChange({
            target: {
              name: name,
              value: { ...formData[name], minute: e.target.value },
            },
          })
        }
        required
      >
        <option value="">Minute</option>
        {/* Generate options for minutes */}
        {minuteOptions.map((minute) => (
          <option key={minute} value={minute}>
            {minute < 10 ? `0${minute}` : minute}
          </option>
        ))}
      </select>

      <select
        name="timezone"
        value={formData[name]?.timezone}
        onChange={(e) =>
          handleChange({
            target: {
              name: name,
              value: { ...formData[name], timezone: e.target.value },
            },
          })
        }
        required
        className="input-field custom:w-1/3"
      >
        <option value="">Select Timezone</option>
        {timezones.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
    </>
  );
}

export default function DatePicker({
  handleChange,
  formData,
  name = "dob",
  yearOnly = false,
  reverse = false,
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
  let yearOptions;
  if (reverse) {
    yearOptions = range(
      new Date().getFullYear(),
      new Date().getFullYear() + 50
    );
  } else {
    yearOptions = range(
      new Date().getFullYear() - 124,
      new Date().getFullYear()
    ).reverse();
  }

  return (
    <>
      <select
        className="input-field"
        name="year"
        value={formData[name]?.year}
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
            value={formData[name]?.month}
            onChange={(e) => {
              const monthValue = e.target.value;
              const yearValue = formData[name]?.year;
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
                      formData[name]?.day > daysInMonth
                        ? ""
                        : formData[name]?.day,
                  }, // Reset day if it exceeds the number of days in the selected month
                },
              });
            }}
            required
          >
            <option value="">Month</option>
            {/* Generate options for months */}
            {monthNames.map((month, index) => (
              <option key={index + 1} value={index}>
                {month}
              </option>
            ))}
          </select>

          <select
            className="input-field"
            name="day"
            value={formData[name]?.day}
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
              getDaysInMonth(formData[name]?.year, formData[name]?.month)
            ).map((day) => (
              <option key={day} value={day+1}>
                {day}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  );
}



// export default function DatePickerPrevious({
//   handleChange,
//   formData,
//   name = "dob",
//   yearOnly = false,
//   reverse = false,
// }) {
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const getDaysInMonth = (year, month) => {
//     return new Date(year, month, 0).getDate();
//   };

//   // Function to generate an array of numbers from 1 to n
//   const range = (start, end) => {
//     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   };

//   // Year options (adjust the range as needed)
//   let yearOptions;
//   if (reverse) {
//     yearOptions = range(
//       new Date().getFullYear(),
//       new Date().getFullYear() - 50
//     );
//   } else {
//     yearOptions = range(
//       new Date().getFullYear() - 50,
//       new Date().getFullYear()
//     ).reverse();
//   }

//   return (
//     <>
//       <select
//         className="input-field"
//         name="year"
//         value={formData[name]?.year}
//         onChange={(e) =>
//           handleChange({
//             target: {
//               name: name,
//               value: { ...formData[name], year: e.target.value },
//             },
//           })
//         }
//         required
//       >
//         <option value="">Year</option>
//         {/* Generate options for years */}
//         {yearOptions.map((year) => (
//           <option key={year} value={year}>
//             {year}
//           </option>
//         ))}
//       </select>

//       {yearOnly ? null : (
//         <>
//           <select
//             className="input-field"
//             name="month"
//             value={formData[name]?.month}
//             onChange={(e) => {
//               const monthValue = e.target.value;
//               const yearValue = formData[name]?.year;
//               const daysInMonth =
//                 monthValue && yearValue
//                   ? getDaysInMonth(yearValue, monthValue)
//                   : 31; // Default to 31 days if month or year is not selected

//               handleChange({
//                 target: {
//                   name: name,
//                   value: {
//                     ...formData[name],
//                     month: monthValue,
//                     day:
//                       formData[name]?.day > daysInMonth
//                         ? ""
//                         : formData[name]?.day,
//                   }, // Reset day if it exceeds the number of days in the selected month
//                 },
//               });
//             }}
//             required
//           >
//             <option value="">Month</option>
//             {/* Generate options for months */}
//             {monthNames.map((month, index) => (
//               <option key={index + 1} value={index + 1}>
//                 {month}
//               </option>
//             ))}
//           </select>

//           <select
//             className="input-field"
//             name="day"
//             value={formData[name]?.day}
//             onChange={(e) =>
//               handleChange({
//                 target: {
//                   name: name,
//                   value: { ...formData[name], day: e.target.value },
//                 },
//               })
//             }
//             required
//           >
//             <option value="">Day</option>
//             {/* Generate options for days based on the selected month and year */}
//             {range(
//               1,
//               getDaysInMonth(formData[name]?.year, formData[name]?.month)
//             ).map((day) => (
//               <option key={day} value={day}>
//                 {day}
//               </option>
//             ))}
//           </select>
//         </>
//       )}
//     </>
//   );
// }