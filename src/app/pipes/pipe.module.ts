import { NgModule } from '@angular/core';
import { TagPipe } from './tag.pipe';
import { DeviantPipe } from './deviant.pipe';
import { DayPipe } from './day.pipe';
import { ShortDayPipe } from './short-day.pipe';
import { ShortTimePipe } from './short-time.pipe';

@NgModule({
    declarations: [
        DayPipe,
        DeviantPipe,
        TagPipe,
        ShortDayPipe,
        ShortTimePipe
    ],
    exports: [
        DayPipe,
        DeviantPipe,
        TagPipe,
        ShortDayPipe,
        ShortTimePipe
    ]
})
export class PipeModule {}