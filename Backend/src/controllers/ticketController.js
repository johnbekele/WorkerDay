import Ticket from '../models/ticket.js';
import User from '../models/User.js';

const getAllTicket = async (req, res) => {
  const role = req.query.role;
  const id = req.query.id;
  const clientId = req.query.client || 'test-client';

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
  const { subject, recordType, productsegment, priority } = req.body;
  const userID = req.user.id;

  try {
    if (!subject || !recordType || !productsegment || !priority) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    const newTicket = await Ticket.create({
      subject,
      recordType,
      productsegment,
      priority,
      assigned_to: userID,
      status: 'Pending',
      clientId: clientId,
    });

    if (!newTicket) return res.status(404).json({ msg: 'Request not found' });

    return res.status(201).json(newTicket);
  } catch (error) {
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

export default { getAllTicket, createTicket, deleteTicket, updateTicket };
