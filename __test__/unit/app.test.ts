const schedule1 = require('../fixtures/schedule1.test.json');
const schedule2 = require('../fixtures/schedule2.test.json');

import findAppointments from '../../src/helpers/appointments';

describe('Schedule with 1 break', () => {
    it('should pass', () => {
        const appointments = findAppointments(schedule1);
        expect(appointments.length).toBe(0);
    });
})

describe('Schedule with 2 breaks', () => {
    it('should pass', () => {
        const appointments = findAppointments(schedule2);
        expect(appointments.length).toBe(17);
    });
})