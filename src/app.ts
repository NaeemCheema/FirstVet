import findAppointments from "@src/appointments";
import { appointmentType } from "@src/app.types";
const data = require('../data.json');

const formateAppoitmentTime = (appointmentTime: Date) => {
	return new Date(appointmentTime).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});
};

/* Output veterinarian appoitments */
const showAppointments = (appointments: appointmentType) => {
	appointments.forEach((appointment) => {
		console.log(
			appointment.shiftDate,
			formateAppoitmentTime(appointment.appoitmnetStart),
			'-',
			formateAppoitmentTime(appointment.appoitmentEnd),
			appointment.employeeName
		);
	});
};

/* Find and show available veterinarian appoitments */
const findAndShow = () => {
	const available: appointmentType = findAppointments(data);
	showAppointments(available);
};

findAndShow();

