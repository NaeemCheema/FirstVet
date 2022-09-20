export type AppointmentType = {
  shiftDate: string;
  appoitmnetStart: number;
  appoitmentEnd: number;
  employeeName: string;
}[];

export type ScheduleType = {
  scheduleId: number;
  startDate: Date;
  startTime: Date;
  endDate: Date;
  endTime: Date;
  startBreak: Date;
  endBreak: Date;
  startBreak2: Date;
  endBreak2: Date;
  startBreak3: Date;
  endBreak3: Date;
  startBreak4: Date;
  endBreak4: Date;
  employeeId: number;
  employeeName: string;
};
