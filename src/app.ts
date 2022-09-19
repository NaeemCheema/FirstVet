import { appointmentData, appointmentType } from "@src/app.types";
const data = require('../data.json');

const formateAppoitmentTime = (appointmentTime: Date) => {
	return new Date(appointmentTime).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	});
};

const findAppointments = (data: appointmentData[]) => {
	const appointments: appointmentType = [];
	data.forEach((schedule: appointmentData) => {
		const shiftStartDateTime = new Date(`${schedule.startDate} ${schedule.startTime}`).getTime();
		const shiftEndDateTime = new Date(`${schedule.endDate} ${schedule.endTime}`).getTime();

		let breaks = [
			[
				new Date(`${schedule.startDate} ${schedule.startBreak}`).getTime(),
				new Date(`${schedule.startDate} ${schedule.endBreak}`).getTime(),
			],
			[
				new Date(`${schedule.startDate} ${schedule.startBreak2}`).getTime(),
				new Date(`${schedule.startDate} ${schedule.endBreak2}`).getTime(),
			],
			[
				new Date(`${schedule.startDate} ${schedule.startBreak3}`).getTime(),
				new Date(`${schedule.startDate} ${schedule.endBreak3}`).getTime(),
			],
			[
				new Date(`${schedule.startDate} ${schedule.startBreak4}`).getTime(),
				new Date(`${schedule.startDate} ${schedule.endBreak4}`).getTime(),
			],
		];

		/* ignore empty breaks */
		breaks = breaks.filter(([start, end]) => start - end !== 0);

		const calculateAvailableTime = shiftEndDateTime - shiftStartDateTime;
		if (calculateAvailableTime !== 0) {
			let shiftStart = shiftStartDateTime;
			const shiftEnd = shiftEndDateTime;
			let nextShift = new Date(shiftStart + (15 * 60000)).getTime();
			while (Math.max(shiftStart, nextShift) <= shiftEnd) {
				/* verify shift is valid or it is break time */
				const status = breaks.find(([start, end]) => nextShift > start && nextShift <= end);
				if (!status) {
					appointments.push({
						shiftDate: new Date(shiftStartDateTime).toLocaleDateString('en-CA'),
						appoitmnetStart: new Date(shiftStart),
						appoitmentEnd: new Date(nextShift),
						employeeName: schedule.employeeName,
					});
				}
				shiftStart = nextShift;
				nextShift = new Date(shiftStart + (15 * 60000)).getTime();
			}
		}
	});

	/* Sort appoitments by appoitment start time */
	return appointments.sort((a, b) => a.appoitmnetStart.getTime() - b.appoitmnetStart.getTime());
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