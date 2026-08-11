import Student from "../models/student.model.js";
import { sendParentConfirmation, sendAdminNotification } from "../lib/email.js";

// @desc    Submit a new registration
// @route   POST /api/registrations
// @access  Public
export const submitRegistration = async (req, res) => {
  try {
    const {
      childName,
      parentName,
      email,
      phone,
      dateOfBirth,
      ageGroup,
      address,
      message,
    } = req.body;

    // Validation - Check required fields
    const requiredFields = [
      "childName",
      "parentName",
      "email",
      "phone",
      "dateOfBirth",
      "ageGroup",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Validate age group
    const validAgeGroups = [
      "3-12months",
      "1-2years",
      "2-3years",
      "3-4years",
      "4-5years",
      "5-6years",
    ];
    if (!validAgeGroups.includes(ageGroup)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid age group. Must be 3-12months, 1-2years, 2-3years, 3-4years, 4-5years, or 5-6years",
      });
    }

    // Validate phone (basic validation - at least 8 digits)
    const phoneRegex = /^[\+\d\s\-\(\)]{8,}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    // Validate date of birth is not in the future
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    if (birthDate > today) {
      return res.status(400).json({
        success: false,
        message: "Date of birth cannot be in the future",
      });
    }

    // Check for duplicate registration (same child name + parent name + email)
    const existingRegistration = await Student.findOne({
      childName: { $regex: new RegExp(`^${childName}$`, "i") },
      parentName: { $regex: new RegExp(`^${parentName}$`, "i") },
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: "A registration with this information already exists",
      });
    }

    // Create new registration
    const newRegistration = new Student({
      childName: childName.trim(),
      parentName: parentName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      dateOfBirth: birthDate,
      ageGroup,
      address: address ? address.trim() : "",
      message: message ? message.trim() : "",
      status: "pending",
    });

    await newRegistration.save();

    // Send emails (don't await to avoid blocking response)
    Promise.all([
      sendParentConfirmation(email, parentName, childName, ageGroup),
      sendAdminNotification({
        childName,
        parentName,
        email,
        phone,
        ageGroup,
        address,
        message,
      }),
    ]).catch((emailError) => {
      console.error("Email sending failed:", emailError);
    });

    // Remove sensitive fields from response
    const registrationResponse = newRegistration.toObject();
    delete registrationResponse.__v;

    res.status(201).json({
      success: true,
      message: "Registration submitted successfully",
      data: registrationResponse,
    });
  } catch (error) {
    console.error("Submit registration error:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This registration already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to submit registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get all registrations (Admin only)
// @route   GET /api/registrations
// @access  Private (Admin)
export const getAllRegistrations = async (req, res) => {
  try {
    const { status, ageGroup, page = 1, limit = 10 } = req.query;

    // Build filter object
    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (ageGroup && ageGroup !== "all") filter.ageGroup = ageGroup;

    // Calculate pagination
    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(parseInt(limit) || 10, 50);
    const skip = (pageNum - 1) * limitNum;

    // Get total count for pagination
    const totalRegistrations = await Student.countDocuments(filter);

    // Get registrations with pagination
    const registrations = await Student.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: registrations.length,
      total: totalRegistrations,
      page: pageNum,
      totalPages: Math.ceil(totalRegistrations / limitNum),
      data: registrations,
    });
  } catch (error) {
    console.error("Get all registrations error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get single registration by ID (Admin only)
// @route   GET /api/registrations/:id
// @access  Private (Admin)
export const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration ID format",
      });
    }

    const registration = await Student.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error("Get registration by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Update registration status (Admin only)
// @route   PUT /api/registrations/:id/status
// @access  Private (Admin)
export const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration ID format",
      });
    }

    // Validate status
    const validStatuses = ["pending", "approved", "rejected"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be pending, approved, or rejected",
      });
    }

    const registration = await Student.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    registration.status = status;
    await registration.save();

    res.status(200).json({
      success: true,
      message: `Registration ${status} successfully`,
      data: registration,
    });
  } catch (error) {
    console.error("Update registration status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update registration status",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Delete registration (Admin only)
// @route   DELETE /api/registrations/:id
// @access  Private (Admin)
export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid registration ID format",
      });
    }

    const registration = await Student.findByIdAndDelete(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    console.error("Delete registration error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete registration",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Get registration statistics (Admin only)
// @route   GET /api/registrations/stats/summary
// @access  Private (Admin)
export const getRegistrationStats = async (req, res) => {
  try {
    const total = await Student.countDocuments();
    const pending = await Student.countDocuments({ status: "pending" });
    const approved = await Student.countDocuments({ status: "approved" });
    const rejected = await Student.countDocuments({ status: "rejected" });

    const byAgeGroup = {
      "3-12months": await Student.countDocuments({ ageGroup: "3-12months" }),
      "1-2years": await Student.countDocuments({ ageGroup: "1-2years" }),
      "2-3years": await Student.countDocuments({ ageGroup: "2-3years" }),
      "3-4years": await Student.countDocuments({ ageGroup: "3-4years" }),
      "4-5years": await Student.countDocuments({ ageGroup: "4-5years" }),
      "5-6years": await Student.countDocuments({ ageGroup: "5-6years" }),
    };

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        approved,
        rejected,
        byAgeGroup,
      },
    });
  } catch (error) {
    console.error("Get registration stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// @desc    Delete multiple registrations (Admin only)
// @route   DELETE /api/registrations/bulk/delete
// @access  Private (Admin)
export const deleteMultipleRegistrations = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of registration IDs",
      });
    }

    // Validate all IDs format
    const invalidIds = ids.filter((id) => !id.match(/^[0-9a-fA-F]{24}$/));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format detected",
      });
    }

    const result = await Student.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} registrations deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete multiple registrations error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete registrations",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
