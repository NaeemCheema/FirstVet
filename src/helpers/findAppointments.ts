import { ScheduleType, AppointmentType } from "@src/types";

const FIFTEEN_MINUTES = 15 * 60000;

const getTimestamp = (dateTime: string | number) => {
	/* convert time into timestamp */
	return +new Date(dateTime);
}

const findBreaks = (schedule: ScheduleType) => {
	const breaks = [];

	for (const [key, value] of Object.entries(schedule)) {
		if(!(key.includes('startBreak'))) continue ;
		const start = getTimestamp(`${schedule.startDate} ${value}`);
		const nextIndex = Object.keys(schedule).indexOf(key) + 1; // find break end key index
		const end = getTimestamp(`${schedule.startDate} ${Object.values(schedule)[nextIndex]}`);
		if(end - start !== 0) breaks.push([start, end]);
	}
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
		let nextShift = getTimestamp(shiftStart + FIFTEEN_MINUTES);
		while (Math.max(shiftStart, nextShift) <= shiftEnd) {
			/* verify shift is valid or it is break time */
			const status = breaks.find(([start, end]) => nextShift > start && nextShift <= end);
			if (!status) {
				appointments.push({
					shiftDate: new Date(shiftStartDateTime).toLocaleDateString('en-CA'),
					appoitmnetStart: getTimestamp(shiftStart),
					appoitmentEnd: getTimestamp(nextShift),
					employeeName: schedule.employeeName,
				});
			}
			shiftStart = nextShift;
			nextShift = getTimestamp(shiftStart + FIFTEEN_MINUTES);
		}
	});

	/* Sort appoitments by appoitment start time */
	return appointments.sort((a, b) => a.appoitmnetStart - b.appoitmnetStart);
};

export default findAppointments;