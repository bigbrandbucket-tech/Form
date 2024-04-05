import "./FormPage.scss";
import { sections } from "../utils/data/form/FormPageData";

export default function FormPage() {
  return (
    <div className="form-page">
      <Banner />

      <Title />

      {sections.map((section, i) => (
        <div key={i} className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            {section.title}
          </div>
          <div className="collapse-content">{section.component}</div>
        </div>
      ))}
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
