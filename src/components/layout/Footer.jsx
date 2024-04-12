//

export default function Footer() {
  const informationArray1 = [
    "Visa Exempt Travellers",
    "How to Apply for an ETA Application",
    "After You Apply for an ETA",
  ];
  const informationArray2 = [
    "Travel Authorization",
    "Terms & Conditions",
    "Privacy Policy",
  ];

  return (
    <div className="bg-black text-white p-12 mt-8 md:flex justify-between">
      <div className="mb-4">© canadaetaportal, All Rights Reserved.</div>
      <div>
        <div className="md:flex gap-4 justify-end">
          {informationArray1.map((text, i) => {
            return (
              <div key={i} className="flex gap-4">
                <div className="border-[1px] border-white"></div>
                <div className="link link-hover">{text}</div>
              </div>
            );
          })}
        </div>

        <br />

        <div className="md:flex gap-4 justify-end">
          {informationArray2.map((text, i) => {
            return (
              <div key={i} className="flex gap-4">
                <div className="border-[1px] border-white"></div>
                <div className="link link-hover">{text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
