import React, { useEffect, useState } from "react";
import { courseApi, enrollmentApi } from "../services/api"; // <-- on ajoute enrollmentApi
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await courseApi.get("/courses");
        setCourses(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des cours :", err);
      }
    };

    fetchCourses();
  }, []);

  // Fonction d'inscription
  const handleEnroll = async (courseId) => {
    try {
      await enrollmentApi.post("/enrollments", { courseId });
      setMessage("Inscription réussie !");
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      setMessage("Erreur : déjà inscrit ou serveur indisponible.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="course-grid">
      {message && <p className="message">{message}</p>}
      {courses.map((course) => (
        <div className="course-card" key={course._id || course.id}>
          <h3>{course.title}</h3>
          <p>
            <strong>Formateur :</strong> {course.instructor}
          </p>
          <p>
            <strong>Prix :</strong> {course.price} €
          </p>
          <p className="desc">{course.description}</p>
          <button onClick={() => handleEnroll(course._id || course.id)}>
            S’inscrire
          </button>
        </div>
      ))}
    </div>
  );
}
