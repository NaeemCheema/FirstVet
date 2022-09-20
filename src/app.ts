import findAppointments from "@src/helpers/appointments";
import { AppointmentType } from "@src/types";
const data = require('../data.json');

const formatAppoitmentTime = (appointmentTime: Date) => {
	return new Date(appointmentTime).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});
};

/* Output veterinarian appoitments */
const showAppointments = (appointments: AppointmentType) => {
	appointments.forEach((appointment) => {
		console.log(
			appointment.shiftDate,
			formatAppoitmentTime(appointment.appoitmnetStart),
			'-',
			formatAppoitmentTime(appointment.appoitmentEnd),
			appointment.employeeName
		);
	});
};

/* Find and show available veterinarian appoitments */
const findAndShow = () => {
	const available: AppointmentType = findAppointments(data);
	showAppointments(available);
};

findAndShow();

