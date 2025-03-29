import Ticket from '../models/ticket.js';
import User from '../models/User.js';

const getTicketbyId = async (req, res) => {
  const id = req.user.id;
  try {
    const ticket = await Ticket.findAll({ where: { employeeid: id } });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllTicket = async (req, res) => {
  const role = req.user.role;
  const id = req.user.id;

  if (role === 'admin') {
    try {
      const tickets = await Ticket.findAll();
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (role === 'Employee') {
    try {
      const tickets = await Ticket.findAll({ where: { assigned_to: id } });
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (role === 'Manager') {
    try {
      const rawTickets = await Ticket.findAll();
      const myemployees = await User.findAll({ where: { manager_id: id } });

      const tickets = rawTickets.filter((ticket) =>
        myemployees.some(
          (employee) => employee.employee_id === ticket.assigned_to
        )
      );
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: 'Unauthorized' });
  }
};

const createTicket = async (req, res) => {
  const { subject, recordType, productsegment, priority, clientId } = req.body;
  const userID = req.user.id;

  try {
    // First, let's log everything to make sure we have all required data
    console.log('Creating ticket with:', {
      subject,
      recordType,
      productsegment,
      priority,
      clientId,
      userID,
    });

    // Validation check
    if (!subject || !recordType || !productsegment || !priority || !clientId) {
      return res.status(400).json({
        message: 'Please enter all required fields',
      });
    }

    // Create the ticket with proper field mapping
    const newTicket = await Ticket.create({
      subject,
      record_type: recordType, // Map recordType to record_type
      product_segment: productsegment, // Map productsegment to product_segment
      priority,
      assigned_to: userID,
      status: 'Pending',
      clientId: clientId,
    });

    console.log('Created ticket:', newTicket); // Log the created ticket

    return res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error details:', error); // Log the full error
    res.status(500).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { subject, recordType, productsegment, priority, assigned_to, status } =
    req.body;
  try {
    const updateTicket = await Ticket.update({
      subject,
      recordType,
      productsegment,
      priority,
      assigned_to,
      status,
    });
    if (!updateTicket) return res.status(404).json({ msg: 'Ticket not found' });
    return res.status(200).json({ msg: 'Ticket updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTicket = await Ticket.destroy({ where: { id } });
    if (!deletedTicket)
      return res.status(404).json({ msg: 'Ticket not found' });
    return res.status(200).json({ msg: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  getTicketbyId,
  getAllTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
