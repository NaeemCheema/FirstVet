const schedule1 = require("../fixtures/schedule1.test.json");
const schedule2 = require("../fixtures/schedule2.test.json");

import findAppointments from "../../src/helpers/findAppointments";

const expectedAppointments = [
	{
		shiftDate: "2020-04-29",
		appoitmentStart: 1588147200000,
		appoitmentEnd: 1588148100000,
		employeeName: "John Doe",
	},
	{
		shiftDate: "2020-04-29",
		appoitmentStart: 1588148100000,
		appoitmentEnd: 1588149000000,
		employeeName: "John Doe",
	},
	{
		shiftDate: "2020-04-29",
		appoitmentStart: 1588161600000,
		appoitmentEnd: 1588162500000,
		employeeName: "John Doe",
	},
	{
		shiftDate: "2020-04-29",
		appoitmentStart: 1588162500000,
		appoitmentEnd: 1588163400000,
		employeeName: "John Doe",
	},
];

describe("Schedule", () => {
  describe("With different breaks", () => {
    it("should pass with 1-break", () => {
      const appointments = findAppointments(schedule1);
      expect(appointments.length).toBe(4);
    });
    it("should contain four 15-minutes appointment", () => {
      const appointments = findAppointments(schedule1);
      expect(appointments).toMatchObject(expectedAppointments);
    });
    it("should pass with 2-breaks", () => {
      const appointments = findAppointments(schedule2);
      expect(appointments.length).toBe(17);
    });
  });
});
