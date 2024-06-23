import { HoursAndMinutesPipe } from './hours-and-minutes.pipe';

describe('HoursAndMinutesPipe', () => {
  it('create an instance', () => {
    const pipe = new HoursAndMinutesPipe();
    expect(pipe).toBeTruthy();
  });
});
