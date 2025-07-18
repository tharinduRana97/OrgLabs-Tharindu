const asyncHandler = require("express-async-handler");
const {
  getAllStudents,
  addNewStudent,
  getStudentDetail,
  setStudentStatus,
  updateStudent,
} = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
  const payload = req.query; // Optionally include filters/sorting/pagination
  const students = await getAllStudents(payload);
  res.status(200).json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await addNewStudent(payload);
  res.status(201).json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
  const payload = { ...req.body, id: req.params.id };
  const result = await updateStudent(payload);
  res.status(200).json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  const student = await getStudentDetail(studentId);
  res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { userId, reviewerId, status } = req.body;
  const result = await setStudentStatus({ userId, reviewerId, status });
  res.status(200).json(result);
});

module.exports = {
  handleGetAllStudents,
  handleGetStudentDetail,
  handleAddStudent,
  handleStudentStatus,
  handleUpdateStudent,
};
