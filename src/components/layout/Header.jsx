//

export default function Header() {
  return (
    <div>
      <div className="bg-red-500 h-[0.4rem]"></div>

      <div className="app-bar flex justify-between items-center px-1 m470:px-12 py-4">
        <div className="">
          <img
            width={200}
            className=""
            src="https://canadaetaportal.com/assets/images/logo.png"
            alt=""
          />
        </div>

        <div className="flex items-center gap-2">
          <img
            className="w-[30px] h-[20px]"
            src="https://travel-canada-services.com/img/usa-map.png"
            alt=""
          />
          <div className="font-semibold text-lg">English</div>
        </div>
      </div>
    </div>
  );
}
