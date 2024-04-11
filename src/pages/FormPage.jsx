import "./FormPage.scss";
import { sections } from "../utils/data/form/FormPageData";
import { useStore } from "../context/stores/form/main";

export default function FormPage() {
  const { currentComponent, setCurrentComponent } = useStore();

  return (
    <div className="form-page">
      <div className="banner">
        <Banner />
      </div>

      <Title />

      <div className="px-16">
        <hr className="my-4 border-t-2 border-gray-300" />
        {sections.map((section, i) => (
          <div
            key={i}
            className="collapse collapse-arrow bg-base-200 border-[1px] rounded-none"
            onClick={() => {
              setCurrentComponent(i);
            }}
          >
            <input
              type="checkbox"
              name="my-accordion-2"
              checked={i === currentComponent}
              onChange={() => {}}
              // disabled={i > currentComponent}
            />
            <div
              className={`collapse-title text-lg font-medium ${
                i === currentComponent ? "bg-[#960101] text-white p-4" : ""
              } ${i < currentComponent ? "bg-[#6BB459] text-white p-4" : ""}`}
            >
              {section.title}
            </div>
            <div className="collapse-content">{section.component}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Banner({}) {
  return (
    <div className="bg-img-div">
      <img src="https://canadaetaportal.com/eta_app//img/about.jpg" alt="" />
    </div>
  );
}

function Title({}) {
  return (
    <div className="flex flex-col items-center my-8">
      <h1 className="text-2xl font-semibold">
        Application for an Electronic Travel Authorization (eTA)
      </h1>
      <h2 className="text-xl font-semibold">eTA/8B1/A14</h2>
    </div>
  );
}
