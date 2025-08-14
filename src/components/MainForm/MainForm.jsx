import React, { useEffect, useState } from "react";
import axios from "axios";
import Hebcal from "hebcal";
import { NotificationManager } from "react-notifications";
import "./MainForm.css";

// Reusable Input Component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  dir = "rtl",
}) => (
  <div className="input-block">
    <label className="form-input-label">{label}</label>
    <input
      type={type}
      name={name}
      className="form-input"
      dir={dir}
      value={value}
      onChange={onChange}
    />
  </div>
);

// Reusable Select Component
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  dir = "rtl",
}) => (
  <div className="input-block">
    <label className="form-input-label">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      dir={dir}
      className="form-input"
    >
      <option value="">בחר {label}...</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const MainForm = ({
  formConfig,
  onSubmit,
  scriptUrl,
  hebrewMonthNames = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ],
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState("");
  const [formState, setFormState] = useState(
    formConfig.reduce((state, field) => {
      state[field.name] = field.defaultValue || "";
      return state;
    }, {})
  );

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots((prevDots) =>
          prevDots === "..." ? "" : prevDots + "."
        );
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const isFormValid = formConfig.every(
        (field) => formState[field.name] !== ""
      );

      if (!isFormValid) {
        NotificationManager.error("בבקשה למלא את כל הפרטים", "שגיאה", 3000);
        return;
      }

      setLoading(true);

      const currentDate = new Date();
      const today = new Hebcal.HDate();
      const hebrewDateStr = today.toString("h");
      const hebrewDateArray = hebrewDateStr.split(" ");

      const formData = new FormData();
      formConfig.forEach((field) => {
        formData.append(field.name, formState[field.name]);
      });
      formData.append("g_day", currentDate.getDate());
      formData.append(
        "g_month",
        "ב" + hebrewMonthNames[currentDate.getMonth()]
      );
      formData.append("g_year", currentDate.getFullYear());
      formData.append("h_day", hebrewDateArray[0]);
      formData.append("h_month", hebrewDateArray[1]);
      formData.append("h_year", hebrewDateArray[2]);

      const response = await axios.post(scriptUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.pdfURL);

      setLoading(false);
      window.location.href = response.data.pdfURL;
      NotificationManager.success("הקובץ ירד תוך מספר שניות", "המתן", 3000);
    } catch (error) {
      console.error(error);
      setLoading(false);
      NotificationManager.error("לא הצליח לייצר את הקובץ", "שגיאה", 3000);
    }
  };
  const topMessage = `חיילים יקרים\nשימו לב,\nלאחר מילוי התשובות, הקובץ יורד כ-pdf, את הקובץ יש לשלוח לשלישות/ לנפגעים על מנת שיוזן במערכת.\nבנוסף, שימו לב שבשורות שכתוב עדים/מעורבים, לכתוב שמות ספציפיים של אנשים ולא "כל הצוות שלי"`;
  const bottomMessage = `
  כאן בשבילכם,
מדור נפגעים חטיבת גבעתי

אחיה ס׳ רמ״ד- 0585970777  
יעל ע׳ רמ״ד- 054-3377526`;

  return (
    <div className="main-form">
      <p
        style={{
          justifySelf: "center",
          fontSize: "0.9rem",
          direction: "rtl",
        }}
      >
        {topMessage.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>
      {formConfig.map((field) =>
        field.type === "select" ? (
          <SelectField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formState[field.name]}
            onChange={handleInputChange}
            options={field.options}
            dir={field.dir}
          />
        ) : (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            value={formState[field.name]}
            onChange={handleInputChange}
            type={field.type}
            dir={field.dir}
          />
        )
      )}
      <button
        className={`submit-button ${loading ? "loading" : ""}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? `${loadingDots}מייצר את המסמך` : `הורד מסמך`}
      </button>
      {/* <div
        style={{ marginTop: "1.5vh", fontSize: "1.1rem", textAlign: "center" }}
      >
        מדור נפגעים גבעתי פה בשבילך
      </div> */}
      <p style={{ marginTop: "0vh", textAlign: "center", direction: "rtl" }}>
        {bottomMessage.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </p>

      <div style={{ fontSize: "1rem" }}></div>
    </div>
  );
};

export default MainForm;
