const Enrollment = require("../models/Enrollment");
const axios = require("axios");


exports.enroll = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const exists = await Enrollment.findOne({ userId, courseId });
    if (exists) {
      return res.status(400).json({ message: "Déjà inscrit à ce cours." });
    }

    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();

    res.status(201).json(enrollment);
  } catch (err) {
    console.error("Erreur d'inscription :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getUserEnrollments = async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.find({ userId });

    const enrichedEnrollments = await Promise.all(
      enrollments.map(async (enroll) => {
        try {
          const courseRes = await axios.get(
            `http://course-service/api/courses/${enroll.courseId}`
          );
          const course = courseRes.data;

          return {
            ...enroll._doc,
            course, // ajouter les données du cours dynamiquement
          };
        } catch (err) {
          console.error(
            `Erreur chargement cours ${enroll.courseId} :`,
            err.message
          );
          return {
            ...enroll._doc,
            course: null,
          };
        }
      })
    );

    res.json(enrichedEnrollments);
  } catch (err) {
    console.error("Erreur récupération des inscriptions :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
