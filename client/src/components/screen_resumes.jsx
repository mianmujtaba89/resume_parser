import React, { useState } from "react";
import { Link, NavLink, useNavigate, Outlet, Route, Routes } from "react-router-dom";
import { FaDollarSign, FaGraduationCap } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import {
  BsLinkedin,
  BsFileEarmarkText,
  BsStarFill,
  BsBookmark,
  BsBookmarkFill,
  BsArrowRight,
} from "react-icons/bs";
import Spinner from "./Spinner";
import { useEffect } from "react";
import Navbar from "./header/Navbar";
import { useFormik } from "formik";

const initialValues = {
  job_id: "",
};

export default function ScreenResumes(props) {
  console.log("proper", props);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true)
  const [card, setCard] = React.useState(false)

  const [mark, setMark] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [pdfFiles, setPDFFiles] = useState([]);
  const [details, setDetails] = useState([]);
  const formData = new FormData();


  const { values, errors, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: initialValues,
      onSubmit: (values) => {
        console.log(values);
      },
    });

    const handleSubmit = (event) => {
      event.preventDefault();
      // Form validation
      if (!values.job_id) {
        alert("Job Description is required!");
        return;
      }
  
      // If all validations pass, proceed with form submission
      console.log("Form submitted!");
      // Add your submission logic here
    };
  
  const handleFileChange = (e) => {
    if (e.target.files.length) {
      const selectedFiles = Array.from(e.target.files).map((file) => ({
        preview: URL.createObjectURL(file),
        raw: file,
      }));
      setPDFFiles(selectedFiles);
    }
  };

  const candidateDetails = (e) => {
    setCard(true);
    setDetails(e);

  };

  const screenResumes = async () => {
    if (pdfFiles == []) {
      alert("Enter Job Description");
    } else {
      var resumesFiles = pdfFiles.map((file) => file.raw);
      console.log("Raw Data", resumesFiles);
      // formData.append("resumes", resumes);
      pdfFiles.forEach((file, index) => {
        formData.append(`resumes[${index}]`, file.raw);
      });
      formData.append("job_description", values.job_id);
      setLoading(true);
      const url = `http://127.0.0.1:8000/api/resume_parser/match_resumes/`;
      const data = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (data.ok) {
        var json = await data.json();
        setResumes(json);
        setLoading(false);
      } else {
        alert("Error occurred while fetching data from the server.");
        setLoading(false);
      }
    }
    console.log(pdfFiles);
  };

  const markHandle = () => {
    if (mark) {
      setMark(false);
    } else {
      setMark(true);
    }
  };
  const [application_id, set_id] = useState([]);

  const forScheduled = (e) => {
    navigate(`/calender?application=${application_id}`);
  }

  const forHire = (e) => {
    navigate(`/joboffer/?application=${application_id}`);
  }

  useEffect(() => {
    setLoading(false)
  }, []);

  return (
    <>
      <Navbar />

      <div className="mainBox">
      {loading ? <Spinner /> : null}
        <form
          onSubmit={handleSubmit}
          id="ft-form"
        >

          <fieldset>
            <legend>Job</legend>
            <div className="row w-75 align-items-center d-flex flex-column m-auto pt-5">
              <div className="col-6"> <label>
                Enter Job Description
              </label>
                <textarea
                  name="job_id"
                  value={values.job_id}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />

              </div>
              <div className="col-6">
                <label>
                  Resumes
                </label>
                <input type="file" name="resumes"
                  onChange={handleFileChange}
                  onBlur={handleBlur}
                  multiple />
              </div>

              <div className="col-6 d-flex justify-content-start btns">
                <input type="submit" className="btn" onClick={screenResumes} required />
              </div>

            </div>

          </fieldset>

        </form>

        <span style={{ display: "block", borderBottom: "1px solid black", marginTop: "20px", marginBottom: "20px" }}></span>

       
        {/* {loading?<Spinner/>:null} */}

        <div className="CandidateSection">
          <div className="row candidateContent px-5">
            <div className="col-6">
              {/* ------ Posted Job Section ------ */}
              <div className="postJobSection">
                <div className="card-header border-0">
                  <h3 className="postTitle">All Candidates</h3>
                  <div className="allCandidate w-auto">
                    {/* Candidate Boxes */}
                    {resumes?.map((element) => {
                      return (
                        <div
                          className="row CandidateBox "
                          key={element.id}
                          style={{ height: "183px", cursor: "pointer" }}
                          onClick={() => candidateDetails(element)}
                        >
                          {/* Candidate Box Content */}
                          <div className="contentSide align-self-center">
                            <div className="">
                              <div className="CandidateName ">
                                <h3>{element.name}</h3>
                                <h5>
                                  <b>Similarity: </b>
                                  {element.score.toFixed(2)} % {/* 2 decimal places */}
                                </h5>
                              </div>
                            </div>
                            <p className="textMore">
                              <b>Email: </b>
                              {element.email}
                              <span style={{ marginRight: "20px" }}> </span>
                              <b>Phone: </b>
                              {element.mobile_number}
                              <span style={{ marginRight: "20px" }}> </span>
                              <b>Experience: </b>
                              {element.total_experience}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              {card ? (
                <div
                  className="CandidateDetail w-100 h-auto"
                  style={{
                    backgroundColor: "#f3f3f3",
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <div className="postedInnerBox w-100">
                    <div className="BasicInformation my-4">
                      <div className="">
                        <div className="PostedJobInformation display-b">
                          <h3>
                            {details.name}
                            <span> {details.designation ? `(${details.designation})` : ''}</span>
                          </h3>
                          <div className="needTiming">
                            <h6>
                              <b>
                                <span>Score: </span>
                              </b>
                              {details.score.toFixed(2)} %{" "}
                            </h6>
                            <div className="CandidateBtn display-b">
                              <a
                                href={details.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button type="button" style={{ backgroundColor: "#6314A8", color: "white" }}>
                                  <span>
                                    <BsFileEarmarkText /> &nbsp;&nbsp;
                                  </span>{" "}
                                  <b>CV(PDF)</b>
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                        <h5>Basic information:</h5>
                        <div className="PostedJobInformation ">
                          <h5>
                            <b>Email:</b> <span> {details.email}</span>
                          </h5>
                          <h5>
                            <b>Phone:</b> <span> {details.mobile_number}</span>
                          </h5>
                          <h5>
                            <b>Experience:</b> <span> {details.total_experience}</span>
                          </h5>
                        </div>
                        {/* skill */}
                        <div className="skill my-4">
                          <h5>Skills:</h5>
                          <div className="skillSet ">
                            {details.skills?.slice(0, 8).map((ele) => {
                              return (
                                <div className="skillKey mx-2">
                                  <p className="skillValue skillBox">{ele}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="CandidateDetail backgroundImage w-100"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}