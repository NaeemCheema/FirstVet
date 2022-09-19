const data = require('./appointment.test.json');
const data1 = require('./appointment1.test.json');

import findAppointments from '../src/appointments';

describe('Appointment test', () => {
    it('should pass', () => {
        const appointments = findAppointments(data);
        expect(appointments.length).toBe(0);
    });
})

describe('Appointment test1', () => {
    it('should pass', () => {
        const appointments = findAppointments(data1);
        expect(appointments.length).toBe(17);
    });
})