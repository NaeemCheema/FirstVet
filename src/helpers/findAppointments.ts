import { ScheduleType, AppointmentType } from "@src/types";

const FIFTEEN_MINUTES = 15 * 60000;

const getTimestamp = (dateTime: string) => {
	return new Date(dateTime).getTime();
}

const findBreaks = (schedule: ScheduleType) => {
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
	breaks = breaks.filter(([start, end]) => end - start !== 0);
	return breaks;
}

const findAppointments = (data: ScheduleType[]): AppointmentType => {
	const appointments: AppointmentType = [];
	data.forEach((schedule: ScheduleType) => {
		const shiftStartDateTime = getTimestamp(`${schedule.startDate} ${schedule.startTime}`);
		const shiftEndDateTime = getTimestamp(`${schedule.endDate} ${schedule.endTime}`);

		const breaks = findBreaks(schedule);

		const calculateAvailableTime = shiftEndDateTime - shiftStartDateTime;
		if (calculateAvailableTime === 0) return [];

		let shiftStart = shiftStartDateTime;
		const shiftEnd = shiftEndDateTime;
		let nextShift = new Date(shiftStart + FIFTEEN_MINUTES).getTime();
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
			nextShift = new Date(shiftStart + FIFTEEN_MINUTES).getTime();
		}
	});

	/* Sort appoitments by appoitment start time */
	return appointments.sort((a, b) => a.appoitmnetStart.getTime() - b.appoitmnetStart.getTime());
};

export default findAppointments;