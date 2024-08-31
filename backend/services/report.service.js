import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';

const getAllReports = asyncHandler(async (req, res) => {
  const { report_type, report_title, report_summary, report_details, page } =
    req.query;

  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = 10;
  const offset = (page - 1) * limit;

  let query = `
      SELECT * 
      FROM reports 
      JOIN report_type ON reports.report_type = report_type.id
      WHERE 1=1`;

  let countQuery = `
      SELECT COUNT(*) as total_report 
      FROM reports 
      JOIN report_type ON reports.report_type = report_type.id
      WHERE 1=1`;

  const values = [];

  if (report_type) {
    query += ' AND report_type = ?';
    countQuery += ' AND report_type = ?';
    values.push(report_type);
  }

  if (report_title) {
    query += ' AND report_title LIKE ?';
    countQuery += ' AND report_title LIKE ?';
    values.push(`%${report_title}%`);
  }

  if (report_summary) {
    query += ' AND report_summary LIKE ?';
    countQuery += ' AND report_summary LIKE ?';
    values.push(`%${report_summary}%`);
  }

  if (report_details) {
    query += ' AND report_details LIKE ?';
    countQuery += ' AND report_details LIKE ?';
    values.push(`%${report_details}%`);
  }

  query += ' LIMIT ? OFFSET ?';

  try {
    const [count] = await db.query(countQuery, values);
    const total = count[0].total_report;
    const totalPages = Math.ceil(total / limit);
    const [rows] = await db.query(query, [...values, limit, offset]);

    res.json({
      page: parseInt(page, 10),
      per_page: limit,
      total_report: total,
      total_pages: totalPages,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getReportById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const query = `
        SELECT * 
        FROM reports 
        JOIN report_type ON reports.report_type = report_type.id
        WHERE reports.id = ?`;

  try {
    const [rows] = await db.query(query, [id]);

    if (!rows.length) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const createReport = asyncHandler(async (req, res) => {
  const { report_type, report_title, report_summary, report_details, user_id } =
    req.body;

  if (!report_type || !report_title || !report_summary || !report_details) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
        INSERT INTO reports (report_type, report_title, report_summary, report_details,user_id) 
        VALUES (?, ?, ?, ?,?)`;

  try {
    const [result] = await db.query(query, [
      report_type,
      report_title,
      report_summary,
      report_details,
      user_id,
    ]);

    if (result.insertId) {
      res.status(201).json({ message: 'Report created successfully' });
    }
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const updateReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { report_type, report_title, report_summary, report_details, user_id } =
    req.body;

  if (!report_type || !report_title || !report_summary || !report_details) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
            UPDATE reports 
            SET report_type = ?, report_title = ?, report_summary = ?, report_details = ? ,user_id = ?
            WHERE id = ?`;

  try {
    const [result] = await db.query(query, [
      report_type,
      report_title,
      report_summary,
      report_details,
      user_id,
      id,
    ]);

    if (result.affectedRows) {
      res.json({ message: 'Report updated successfully' });
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const query = `
            DELETE FROM reports 
            WHERE id = ?`;

  try {
    const [result] = await db.query(query, [id]);

    if (result.affectedRows) {
      res.json({ message: 'Report deleted successfully' });
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
