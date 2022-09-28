import findAppointments from "@src/helpers/findAppointments";
import { AppointmentType } from "@src/types";
const schedules = require('@src/data/schedules.json');

const formatAppoitmentTime = (appointmentTime: number) => {
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
			formatAppoitmentTime(appointment.appoitmentStart),
			'-',
			formatAppoitmentTime(appointment.appoitmentEnd),
			appointment.employeeName
		);
	});
};

/* Find and show available veterinarian appoitments */
const findAndShow = () => {
	/* We can add try catch here to validate JSON */
	const available = findAppointments(schedules);
	showAppointments(available);
};

findAndShow();

