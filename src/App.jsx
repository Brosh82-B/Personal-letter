import "./App.css";
import AppFooter from "./components/AppFooter/AppFooter";
import AppHeader from "./components/AppHeader/AppHeader";
import MainForm from "./components/MainForm/MainForm";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

function App() {
  const formConfig = [
    { name: "fullName", label: "שם מלא", type: "text", defaultValue: "" },
    { name: "militaryId", label: "מ.א", type: "text", defaultValue: "" },
    { name: "recruitDate ", label: "תאריך גיוס", type: "date", defaultValue: "" },
    { name: "gdod", label: "גדוד", type: "text", defaultValue: "" },
    { name: "ploga", label: "פלוגה", type: "text", defaultValue: "" },
  
    {
      name: "eventDescription",
      label: "פירוט האירוע",
      type: "textarea",
      defaultValue: "",
    },
    
    // {
    //   name: "witnesses",
    //   label: "האם היו עדים לאירוע",
    //   type: "select",
    //   options: ["כן", "לא"],
    //   defaultValue: "לא",
    // },

  ];
  return (
    <div className="App">
      <AppHeader />
      <div className="main">
        <MainForm
          formConfig={formConfig}
          scriptUrl="https://script.google.com/macros/s/AKfycbzSZke_m75nwD4uUw9OYiRkp-gA3ZC6VXgvY9fuqNWpKqfHckEP8YVnLRD6V1KhFaxmew/exec"
        />
      </div>
      <AppFooter />
      <NotificationContainer />
    </div>
  );
}

export default App;
