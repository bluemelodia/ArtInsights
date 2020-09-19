import { NgModule } from '@angular/core';
import { TagPipe } from './tag.pipe';
import { DeviantPipe } from './deviant.pipe';

@NgModule({
    declarations: [
        DeviantPipe,
        TagPipe
    ],
    exports: [
        DeviantPipe,
        TagPipe
    ]
})
export class PipeModule {}