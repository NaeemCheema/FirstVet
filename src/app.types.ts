export type appointmentType = {
  shiftDate: string;
  appoitmnetStart: Date;
  appoitmentEnd: Date;
  employeeName: string;
}[];

export type appointmentData = {
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
