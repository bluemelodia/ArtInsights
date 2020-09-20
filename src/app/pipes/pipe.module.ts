import { NgModule } from '@angular/core';
import { TagPipe } from './tag.pipe';
import { DeviantPipe } from './deviant.pipe';
import { DayPipe } from './day.pipe';

@NgModule({
    declarations: [
        DayPipe,
        DeviantPipe,
        TagPipe
    ],
    exports: [
        DayPipe,
        DeviantPipe,
        TagPipe
    ]
})
export class PipeModule {}