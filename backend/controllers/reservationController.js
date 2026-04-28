import asyncHandler from 'express-async-handler';
import Reservation from '../models/Reservation.js';

export const createReservation = asyncHandler(async (req, res) => {
  const r = await Reservation.create(req.body);
  res.status(201).json(r);
});

export const getReservations = asyncHandler(async (req, res) => {
  const list = await Reservation.find().sort({ createdAt: -1 });
  res.json(list);
});

export const updateReservationStatus = asyncHandler(async (req, res) => {
  const r = await Reservation.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!r) { res.status(404); throw new Error('Reservation not found'); }
  res.json(r);
});
