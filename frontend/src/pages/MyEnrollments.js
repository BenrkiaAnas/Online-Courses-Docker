import React, { useEffect, useState } from "react";
import { enrollmentApi } from "../services/api";
import './MyEnrollments.css';

export default function MyEnrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await enrollmentApi.get("/enrollments");
        setEnrollments(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des inscriptions :", err);
      }
    };

    fetchEnrollments();
  }, []);

  return (
    <div className="enrollment-grid">
      {enrollments.map((enroll) => (
        <div className="enrollment-card" key={enroll._id || enroll.id}>
          <h3>{enroll.course.title}</h3>
          <p>
            <strong>Prix :</strong> {enroll.course.price}
          </p>
          <p>
            <strong>Description :</strong> {enroll.course.description}
          </p>
          <p>
            <strong>Inscrit le :</strong>{" "}
            {new Date(enroll.enrolledAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
