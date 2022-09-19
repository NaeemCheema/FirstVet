const data = require('./appointment.test.json');
import findAppointments from '../src/appointments';

describe('Appointment test', () => {
    it('should pass', () => {
        const appointments = findAppointments(data);
        expect(appointments.length).toBe(0);
    });
})