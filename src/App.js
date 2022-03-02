import { useEffect, useState } from "react";
import Users from "./components/Users";
import "./App.css";

const DUMMY_DOCTORS = [
  {
    id: `doc_1${Date.now()}`,
    doctorName: "Dr.R.Gopal",
    specialisation: "Khemoteraphist",
    appointmentTime: [
      {
        id: 0,
        time1: "9:00A.M",
        name: "09 am doc Gopal",
        checked: false,
      },
      {
        id: 1,

        time2: "10:00A.M",
        name: "10 am doc Gopal",
        checked: false,
      },
      {
        id: 2,
        time3: "11:00A.M",
        name: "11 am doc Gopal",
        checked: false,
      },
    ],
  },
  {
    id: `doc_2${Date.now()}`,
    doctorName: "Dr.M.Rajender",
    specialisation: "Dermatologist",
    appointmentTime: [
      {
        id: 0,

        time1: "9:00A.M",
        name: "09 am doc Rajender",
        checked: false,
      },
      {
        id: 1,

        time2: "10:00A.M",
        name: "10 am doc Rajender",
        checked: false,
      },
      {
        id: 2,

        time3: "11:00A.M",
        name: "11 am doc Rajender",
        checked: false,
      },
    ],
  },
  {
    id: `doc_3${Date.now()}`,
    doctorName: "Dr.Yash Pal Singh",
    specialisation: "Neurologist",
    appointmentTime: [
      {
        id: 0,
        time1: "9:00A.M",
        name: "09 am doc Yash Pal",
        checked: false,
      },
      {
        id: 1,

        time2: "10:00A.M",
        name: "10 am doc Yash Pal",
        checked: false,
      },
      {
        id: 2,
        time3: "11:00A.M",
        name: "11 am doc Yash Pal",
        checked: false,
      },
    ],
  },
];
function App() {
  //USERS LIST
  const [usersList, setUsersList] = useState([]);
  //SINGLE USER
  const [singleUser, setSingleUser] = useState([]);

  // const [appointmentTime, setAppointement] = useState(APPOINTMENT_TIME);
  const [doctor, setDoctors] = useState(DUMMY_DOCTORS);

  const [radioUser, setRadioBtn] = useState("");
  const [radioCheck, setRadioCheck] = useState(false);
  const [docSelected, setDoctorSelected] = useState({});
  const [check, setChecked] = useState("");

  const [appointmentDetails, setAppointmentDetails] = useState([]);

  // if (doctor.length) {
  //   localStorage.setItem("DoctorsList", JSON.stringify(doctor));
  // }
  if (singleUser.length) {
    localStorage.setItem("UserList", JSON.stringify(singleUser));
  }

  // localStorage.setItem("USER", JSON.stringify(radioUser));

  useEffect(() => {
    if (radioUser) {
      localStorage.setItem("USER", radioUser);
    }
    localStorage.setItem("DoctorsList", JSON.stringify(doctor));
  }, [radioUser, doctor]);

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("UserList"));
    if (localUsers) {
      setUsersList([...localUsers]);
    }

    setTimeout(() => {
      const localDoc = JSON.parse(localStorage.getItem("DoctorsList"));
      if (localDoc) {
        setDoctors(localDoc);
      }
    }, 100);

    const localRadioUser = localStorage.getItem("USER");
    setRadioBtn(localRadioUser);
  }, [singleUser]);
  let radioInput = (
    <div>
      {usersList.length ? (
        usersList.map((v, index) => {
          return (
            <div key={index}>
              <input
                type="radio"
                value={v.name}
                name="users"
                onChange={(e) => radioBtnHandler(e, index)}
              />
              <label htmlFor="name">{v.name}</label>
            </div>
          );
        })
      ) : (
        <p>No users present</p>
      )}
    </div>
  );

  let content = (
    <div className="doc">
      {doctor.map((doc, docIndex) => {
        return (
          <div key={docIndex}>
            <div style={{ marginTop: 20 }}>
              <div>{doc.doctorName}</div>
              <div>{doc.specialisation}</div>
            </div>
            <div style={{ padding: 30 }}>
              Appointment time
              {doc.appointmentTime?.map((v, index) => {
                return (
                  <div key={index}>
                    <input
                      type="checkbox"
                      name={v.name}
                      value={v.time}
                      // disabled={v.checked === true ? true : false}
                      checked={v.checked}
                      onChange={(e) => handleOnChange(e, doc.id)}
                      // onClick={(e) => handleCheck(e, doc.id)}
                    />
                    <label
                      htmlFor="name"
                      key={Math.floor(Math.random() * 9634634699)}
                    >
                      {v.time1}
                    </label>
                    <label
                      htmlFor="name"
                      key={Math.floor(Math.random() * 453453453463464363)}
                    >
                      {v.time2}
                    </label>
                    <label
                      htmlFor="name"
                      key={Math.floor(Math.random() * 9494363463449494444)}
                    >
                      {v.time3}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

  const addedUsers = (user) => {
    setSingleUser(user);
  };
  //Checkbox handler
  const handleOnChange = (e, docId) => {
    let { name } = e.target;
    setChecked(e.target.name);

    /****Selecting checkbox handler**/
    //find the doctor to check
    let data = doctor.find((doc) => doc.id === docId);
    //set doctor selected
    //then update the doctors time and check that
    let updatedData = {
      ...data,
      appointmentTime: data.appointmentTime.map((item) => {
        return item.name === name ? { ...item, checked: true } : item;
      }),
    };
    setDoctorSelected({ ...data });
    //setting the updated doctor to doctors array
    setDoctors(
      doctor.map((doc) => (doc.id !== updatedData.id ? doc : updatedData))
    );
  };
  //radioBtn handler
  const radioBtnHandler = (e, i) => {
    setRadioBtn(e.target.value);
    setRadioCheck(e.target.checked);
  };
  //Appointments display handler
  const bookAppointement = () => {
    console.log("Appointement Booked");
    // Vaerifing radio btn clicked or not and check box value present or not
    if (!radioCheck || !check) {
      return;
    }
    //Checking if the time selected available or not
    let checkAppointement = appointmentDetails.find((v) => v.time === check);
    if (checkAppointement) {
      let timeCheck = checkAppointement.time.replace("doc", "for Dr.");
      alert(`Slot already booked at ${timeCheck}`);
      return;
    }
    //Here checking the name of doctor and seeing whether check is true or not
    let time = doctor.map((v) => {
      return v.appointmentTime.find(
        (p) => check === p.name && p.checked === true
      );
    });
    let x = time.find((v) => v?.name);
    //Saving the appointment details to display
    let details = {
      id: `user_app_${Date.now()}`,
      doctorName: docSelected.doctorName || "DOC",
      userName: radioUser,
      time: x.name,
    };
    //Setting into appointements into  appointementsArray
    setAppointmentDetails((prevState) => {
      return [...prevState, details];
    });
  };
  return (
    <div className="App">
      <Users sendUsers={addedUsers} />
      {radioInput}
      <hr style={{ width: 500 }} />
      {content}
      <div style={{ textAlign: "center" }}>
        <button type="submit" onClick={bookAppointement}>
          Book Appointment
        </button>
      </div>
      <hr style={{ width: 500 }} />
      <div style={{ marginTop: 10 }}>
        Appointements List :
        {appointmentDetails.length ? (
          appointmentDetails?.map((v, index) => {
            return (
              <div style={{ marginTop: 20 }} key={index}>
                {`Appointment ${index + 1}`}
                {". "}
                {`${v.userName} has appointement with ${
                  v.doctorName
                } at ${v?.time?.slice(0, 5)}`}
              </div>
            );
          })
        ) : (
          <p>No Appointements</p>
        )}
      </div>
    </div>
  );
}

export default App;
