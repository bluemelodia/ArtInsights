import { DayOfWeek } from './time.types';

export interface MapAxes {
    mainAxis: DayOfWeek[], /* Ex. days of the week. */
    secondAxis: number[], /* Ex. times of day. */
}

export interface MapData {
    [day: number] : {
        [time: number] : number
    }
}